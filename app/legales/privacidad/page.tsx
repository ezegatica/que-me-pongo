import React from 'react';
import './estilos.css';

export const dynamic = 'force-static';

export default function PrivacidadPage(): JSX.Element {
  return (
    <div className="bg-gray-100 min-h-screen privacy-page">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1>Política de Privacidad de &quot;¿Qué me pongo?&quot;</h1>

        <div className="mt-6 prose prose-indigo prose-lg text-gray-500">
          <h4>Última actualización: 03 de Octubre de 2023</h4>

          <h2>Introducción</h2>

          <p>
            Bienvenido a &quot;¿Qué me pongo?&quot;, la aplicación diseñada para
            ayudarte a tomar decisiones informadas sobre tu vestimenta en
            función del clima de tu ubicación. En &quot;¿Qué me pongo?&quot;,
            valoramos profundamente tu privacidad y nos comprometemos a proteger
            tus datos personales. Esta Política de Privacidad describe cómo
            recopilamos, utilizamos y protegemos tu información. Al utilizar
            nuestra aplicación, aceptas las prácticas descritas en esta
            política.
          </p>

          <h2>Información que Recopilamos</h2>

          <p>
            <strong>Prendas de Vestir y Ubicación:</strong> Recopilamos las
            prendas superiores e inferiores que reportas y la ubicación que
            ingreses en la aplicación para brindarte recomendaciones
            personalizadas basadas en el clima local.
          </p>

          <p>
            <strong>Información de Cuenta de Google:</strong> Al iniciar sesión
            a través de tu cuenta de Google, recopilamos tu dirección de correo
            electrónico, nombre completo y foto de perfil para asociar tu cuenta
            con tus respuestas en nuestra base de datos. Estos datos no los
            solicitamos nosotros, es lo minimo que ofrece Google en los
            servicios de autenticación.
          </p>

          <h2>Uso de la Información</h2>

          <p>
            Utilizamos la información recopilada para los siguientes propósitos:
          </p>

          <ul>
            <li>Personalizar y mejorar tu experiencia en la aplicación.</li>
            <li>
              Brindarte recomendaciones de vestimenta basadas en el clima local.
            </li>
            <li>
              Asociar tu cuenta de usuario a tus preferencias de vestimenta.
            </li>
          </ul>

          <h2>Consentimiento del Usuario</h2>

          <p>
            Al iniciar sesión por primera vez en la aplicación, consientes
            compartir los datos mencionados anteriormente con &quot;¿Qué me
            pongo?&quot;.
          </p>

          <h2>Almacenamiento y Seguridad de Datos</h2>

          <p>
            Tus datos se almacenan de forma segura en una base de datos privada,
            accesible únicamente por Ezequiel Gatica y a través de la página web
            de manera aislada. No almacenamos información sensible.
          </p>
          <p>
            Es importante destacar que el código de la aplicación &quot;¿Qué me
            pongo?&quot; es de código abierto y se encuentra disponible para su
            auditoría por cualquier usuario en cualquier momento. Puedes acceder
            al código fuente y revisar cómo se almacenan y gestionan los datos
            en nuestra base de datos en el siguiente enlace:{' '}
            <a href="https://github.com/ezegatica/que-me-pongo">
              https://github.com/ezegatica/que-me-pongo
            </a>
            .
          </p>

          <h2>Compartir Datos con Terceros</h2>

          <p>
            No compartimos tus datos personales con terceros. Las consultas de
            clima se realizan de forma anónima usando como proxy los servidores
            de la aplicación.
          </p>

          <h2>Derechos de los Usuarios</h2>

          <p>
            Tienes derecho a {/* acceder, */} corregir o eliminar tus datos
            personales en cualquier momento. Puedes solicitar la eliminación de
            todos tus datos personales y respuestas a través de la dirección de
            correo electrónico qmp@ezegatica.com.
          </p>

          <h2>Retención de Datos</h2>

          <p>
            Eliminamos tus datos personales e información de respuestas de forma
            inmediata cuando lo solicites.
          </p>

          <h2>Contacto de Privacidad</h2>

          <p>
            Si tienes preguntas o inquietudes relacionadas con la privacidad de
            tus datos, no dudes en ponerte en contacto con nosotros a través de
            la dirección de correo electrónico qmp@ezegatica.com.
          </p>

          <h2>Cambios en la Política de Privacidad</h2>

          <p>
            Cualquier cambio en esta Política de Privacidad se notificará a
            través del correo electrónico proporcionado y se mostrará un aviso
            al entrar en la aplicación.
          </p>

          <h2>Cumplimiento Legal</h2>

          <p>
            No operamos en territorios cubiertos por leyes de privacidad de
            datos como el Reglamento General de Protección de Datos (RGPD) o la
            Ley de Privacidad del Consumidor de California (CCPA), ya que no
            estamos incorporados como empresa en dichos territorios.
          </p>

          <p>
            Gracias por confiar en &quot;¿Qué me pongo?&quot;. Estamos
            comprometidos a mantener la privacidad y seguridad de tus datos
            personales. Si tienes alguna pregunta adicional o necesitas más
            información, no dudes en contactarnos.
          </p>
          <h4>Última actualización: 03 de Octubre de 2023</h4>
        </div>
      </div>
    </div>
  );
}
