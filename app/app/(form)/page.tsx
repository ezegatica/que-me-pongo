import React, { Suspense } from 'react';
import WeatherForm from './form';
import { Content, Header, RightText, Title } from '@components/headers';
import { config, getUser, userAnswered } from '../../utils';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default function FormPage() {
  return (
    <div>
      <Header>
        <Title>Registro de atuendo</Title>
        <RightText>
          Puedes responder una vez cada {config.form.cooldown} minutos
        </RightText>
      </Header>
      <Content>
        <Suspense>
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
  const {user} = await getUser(authOptions);
  const report = await userAnswered(user);
  if (!report) {
    return <>
    {children}
    </>
  }

  const timeLeft = Math.floor((new Date().getTime() - report.date.getTime()) / 1000 / 60);
  const timeLeftFormatted = `${config.form.cooldown - timeLeft} minutos`;

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-white">
        Ya respondiste el formulario recientemente. <br/>Podrás volver a responder en {timeLeftFormatted}
      </h2>
    </div>
  );
}
