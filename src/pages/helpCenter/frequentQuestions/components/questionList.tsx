import { Paragraph } from '../../HelpCenterStyles';
import { QuestionDropdownProps } from './QuestionsAcordeon';

export const questionList: QuestionDropdownProps[] = [
  {
    question: '¿Cómo recuperar mi contraseña si la olvidé?',
    Answer: (
      <>
        <Paragraph as={'ul'}>
          <li>Accede a la Página de Inicio de Sesión: Visita la página de inicio de sesión en tu navegador web.</li>
          <li>
            Haz Clic en "¿Olvidaste tu Contraseña?": Justo debajo del formulario de inicio de sesión, encontrarás un
            enlace titulado "¿Olvidaste tu Contraseña?" Haz clic en ese enlace para iniciar el proceso de recuperación.
          </li>
          <li>
            Ingresa tu Correo Electrónico: En la página de recuperación de contraseña, se te pedirá que ingreses la
            dirección de correo electrónico asociada a tu cuenta en Music Maniacs. Asegúrate de escribir la dirección
            correcta.
          </li>
          <li>
            Recibe un Correo Electrónico de Recuperación: Una vez que hayas proporcionado tu dirección de correo
            electrónico, recibirás un correo electrónico de recuperación en la bandeja de entrada de esa dirección. Este
            correo electrónico contendrá un enlace seguro que te permitirá restablecer tu contraseña.
          </li>
          <li>
            Cambia tu Contraseña: Abre el correo electrónico y haz clic en el enlace de recuperación. Serás redirigido a
            una página donde podrás ingresar una nueva contraseña. Asegúrate de crear una contraseña segura que cumpla
            con los requisitos de seguridad.
          </li>
        </Paragraph>
        <Paragraph>
          <span>Ahora puedes usar tu nueva contraseña para acceder a tu cuenta.</span>
        </Paragraph>
      </>
    )
  },
  {
    question: '¿Cuál es el propósito de la función de seguimiento de artistas, productoras y espacios de eventos?',
    Answer: (
      <Paragraph>
        Al seguir a tus artistas favoritos, productoras y espacios de eventos, recibes notificaciones cuando se crean
        eventos asociados a alguno de ellos.
      </Paragraph>
    )
  },
  {
    question: '¿Cuál es el propósito de la función de seguimiento de eventos?',
    Answer: (
      <Paragraph>
        Al seguir eventos específicos, te aseguras de que nunca te pierdas ninguna actualización importante. Si un
        evento que sigues se actualiza, cambia de ubicación, fecha u hora, o si, en casos excepcionales, se cancela,
        recibirás notificaciones instantáneas.
      </Paragraph>
    )
  },
  {
    question: '¿Qué es el sistema de niveles de confianza y cómo funciona?',
    Answer: (
      <Paragraph>
        El sistema de niveles de confianza es un pilar fundamental en el funcionamiento de MusicManiacs. La idea es
        otorgar más derechos a los usuarios con el tiempo, para que puedan ayudar a todos a mantener y moderar el
        contenido de la comunidad. Para eso se define una progresión de niveles donde a medida que se avanza se van
        adquiriendo más permisos en la aplicación. Cada nivel tiene sus requisitos asociados en base a las siguientes
        estadísticas: días visitados, eventos consultados, me gustas recibidos, me gustas dados y respuestas creadas.
        Puedes consultar tus estadísticas y tu nivel de confianza en tu perfil.
      </Paragraph>
    )
  },
  {
    question: '¿Cómo se puede reportar contenido incorrecto, ofensivo o spam en la plataforma?',
    Answer: (
      <>
        <Paragraph>
          Si crees haber encontrado contenido que incumpla con las normas establecidas o errores como por ejemplo:
          perfiles duplicados, eventos falsos o demás, sigue los siguientes pasos:
        </Paragraph>
        <Paragraph as={'ul'}>
          <li>
            Accede a las opciones de reporte: Por lo general, cerca del contenido que deseas denunciar, verás una un
            icono con una bandera con el tooltip “Reportar”. Haz clic o toca esta opción para comenzar el proceso de
            reporte.
          </li>
          <li>
            Selecciona la razón del reporte: Cuando se te solicite, elige la razón por la cual estás reportando el
            contenido. Esto puede incluir opciones como "Contenido ofensivo", "Spam" o "Información incorrecta", etc.
          </li>
          <li>
            Proporciona detalles adicionales: A menudo, se te dará la oportunidad de proporcionar más detalles sobre el
            motivo de tu reporte. Si es relevante, describe de manera concisa por qué consideras que este contenido debe
            ser revisado por el equipo de moderación.
          </li>
          <li>
            Envía el reporte: Después de completar el proceso de reporte y proporcionar la información necesaria, envía
            tu reporte haciendo clic en un botón como "Enviar" o "Reportar". El contenido será enviado al equipo de
            moderación para su revisión.
          </li>
        </Paragraph>
      </>
    )
  },
  {
    question: '¿Qué debo hacer si encuentro un perfil duplicado de un artista, productora o espacio de eventos?',
    Answer: (
      <Paragraph>
        Es posible que algún usuario por error cree un perfil ya existente en la plataforma, para evitar tener
        duplicados y mantener la base de datos ordenada, es posible reportar un perfil como duplicado, el proceso de
        reporte es igual a cualquier otro tipo de reporte con la excepción de que es necesario indicar cuál es el perfil
        original
      </Paragraph>
    )
  },
  {
    question: '¿Cómo puedo buscar eventos musicales?',
    Answer: (
      <Paragraph>
        Busca la opción “Buscar eventos” de la barra principal y utiliza los diferentes filtros de búsqueda para navegar
        por los eventos creados en la plataforma.
      </Paragraph>
    )
  },
  {
    question: '¿Qué sucede si mi cuenta ha sido bloqueada?',
    Answer: (
      <Paragraph>
        Si tu cuenta fue bloqueada es posible que hayas excedido los límites establecidos por los administradores de
        puntajes de penalización, estos límites no son públicos y no podrás acceder al sistema hasta que los días de
        penalización hayan terminado, si tienes más dudas por favor contactar con el equipo de soporte
      </Paragraph>
    )
  },
  {
    question: '¿Qué hago si tengo problemas técnicos o errores en la plataforma?',
    Answer: (
      <Paragraph>
        Por favor en caso de encontrarte con problemas técnicos o errores, contáctanos vía mail a
        musicmaniacspf@gmail.com
      </Paragraph>
    )
  },
  {
    question: '¿Cómo puedo personalizar mi perfil de usuario y qué información adicional puedo agregar?',
    Answer: (
      <>
        <Paragraph>
          Utilizando el botón de “Editar perfil”, el cual está en la barra principal, se te redirige a la sección de
          edición del perfil donde podrás editar los siguientes campos y opciones:
        </Paragraph>
        <Paragraph as={'ul'}>
          <li>Nombre completo</li>
          <li>Nombre de usuario</li>
          <li>Email</li>
          <li>Imagen de perfil</li>
          <li>Imagen de portada</li>
          <li>Biografía</li>
          <li>Links</li>
        </Paragraph>
      </>
    )
  }
];
