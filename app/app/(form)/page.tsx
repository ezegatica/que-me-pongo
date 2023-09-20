import React, { Suspense } from 'react';
import { authOptions } from '../../auth';
import { config, getUser, userAnswered } from '../../utils';
import WeatherForm from './form';
import WeatherFormLoading from './form-loading';
import { Content, Header, RightText, Title } from '@components/headers';

export default function FormPage(): JSX.Element {
  return (
    <div>
      <Header>
        <Title>Registro de atuendo</Title>
        <RightText>
          Puedes responder una vez cada {config.form.cooldown} minutos
        </RightText>
      </Header>
      <Content>
        <Suspense fallback={<WeatherFormLoading />}>
          <LimiterWrapper>
            <WeatherForm />
          </LimiterWrapper>
        </Suspense>
      </Content>
    </div>
  );
}

async function LimiterWrapper({
  children
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const { user } = await getUser(authOptions);
  const report = await userAnswered(user);
  if (!report) {
    return <>{children}</>;
  }

  const timeLeft = Math.floor(
    (new Date().getTime() - report.date.getTime()) / 1000 / 60
  );
  const minutesLeft = config.form.cooldown - timeLeft;

  return (
    <div className="text-white text-base">
      <h2 className="font-semibold leading-7">
        Ya respondiste el formulario recientemente.
      </h2>
      <h3 className="leading-8 font-regular">
        Podrás volver a responder en <b>{minutesLeft}</b> minutos.
      </h3>
    </div>
  );
}
