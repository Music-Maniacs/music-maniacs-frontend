import { Paragraph, SubTitle, Title } from './HelpCenterStyles';
import { useTheme } from '../../context/themeContext';
import './ImageContainer.css';

export const ModeratorManual = () => {
  const { theme, toggleTheme } = useTheme();
  const listStyle = {
    listStyleType: 'lower-alpha' // Cambia el tipo de marcador a letras minúsculas
  };
  return (
    <>
      <Title>Manual del moderador Music Maniacs</Title>

      <SubTitle>Introducción</SubTitle>
      <Paragraph>
        Music Maniacs es una aplicación tipo comunidad en línea y la moderación de contenido desempeña un papel
        fundamental en la creación de un espacio saludable y funcional, donde los usuarios se sientan seguros,
        respetados y puedan disfrutar de una experiencia enriquecedora.
      </Paragraph>
      <Paragraph>
        Los moderadores son los encargados de la gestión y resolución de reportes realizados por los usuarios; en esta
        guía encontrarás todas las explicaciones, normas y reglas necesarias para aprender a utilizar el sistema y
        consejos para ayudarte a tomar decisiones más fácilmente.
      </Paragraph>

      <SubTitle>¿Qué es la moderación de contenido?</SubTitle>
      <Paragraph>
        En pocas palabras, la moderación de contenido es el proceso de supervisar una comunidad para asegurarse de que
        todos se sientan incluidos, respetados y seguros. Esto incluye estar atento a las conversaciones para asegurarse
        de que cada persona que participe tenga la oportunidad de expresarse y sea respetuosa con las demás voces.
        También implica hacer un seguimiento del estilo y contenido de los mensajes en la comunidad para asegurarse de
        que estén alineados con el propósito nuestro propósito y valores. Además, como todo el contenido de MusicManiacs
        es administrado por los usuarios, es importante poder tener herramientas de moderación para mantener el sistema
        ordenado y con información correcta y actualizada.
      </Paragraph>

      <SubTitle>Nuestras expectativas</SubTitle>
      <Paragraph>
        Al ser un moderador de MusicManiacs, tu función es supervisar y asegurarse que el contenido que publican los
        usuarios cumpla con lo definido en nuestras políticas de contenido, para eso contamos con un sistema de
        moderación fácil e intuitivo de utilizar para hacer tu trabajo lo más sencillo posible.
      </Paragraph>
      <Paragraph>
        El contenido a moderar es el siguiente:
        <ul>
          <li>Comentarios</li>
          <li>Reseñas</li>
          <li>Videos</li>
          <li>Eventos</li>
          <li>Perfiles de artistas, productoras y espacios de eventos</li>
          <li>Versiones</li>
        </ul>
      </Paragraph>

      <Paragraph>
        A continuación, te explicaremos el funcionamiento de las herramientas y como resolver cada tipo de reporte según
        su categoría y entidad asociada.
      </Paragraph>

      <Title>Moderación de contenido</Title>
      <SubTitle>Reportes</SubTitle>
      <Paragraph>
        En MusicManiacs, la moderación de contenido se realiza vía reportes de usuarios, es decir, que cuando los
        usuarios vean contenido inapropiado, incorrecto o que no cumple con nuestras políticas de contenido
        establecidas, podrán crear un reporte para la entidad, estableciendo una categoría y un comentario opcional.
      </Paragraph>
      <Paragraph>
        Todos los reportes creados se pueden consultar en la tabla de moderación de contenido, la cual se puede acceder
        desde el botón “Moderar” de la barra principal.
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/1.png`)} />
      </div>
      <br></br>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/2.png`)} />
      </div>
      <Paragraph>
        Por defecto, la tabla muestra reportes en estado pendientes y ordenados por fecha de creación, pero utilizando
        los filtros de búsqueda se pueden buscar reportes resueltos e ignorados además de categoría, tipo de contenido y
        fecha de creación.
      </Paragraph>

      <Title>Consultar y resolver un reporte</Title>
      <Paragraph>
        Al consultar un reporte realizado, se podrá ver toda su información en detalle, incluyendo el contenido
        reportado o un link hacia el mismo, comentario del usuario, categoría, estado y demás. Cuando el reporte está en
        estado pendiente, estará disponible un botón para resolverlo. En el formulario de resolución hay dos posibles
        acciones, “Estoy de acuerdo” y “No estoy de acuerdo”.
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/3.png`)} />
      </div>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/4.png`)} />
      </div>

      <Title>Aceptar un reporte</Title>
      <Paragraph>
        Estar de acuerdo con un reporte, implica que lo que reportó el usuario es cierto y se deberían tomar las medidas
        correspondientes según el tipo de contenido y su categoría, afortunadamente para usted, el sistema analiza el
        reporte y toma las acciones correctivas automáticamente. Las acciones según el tipo y la categoría se explicarán
        más adelante en la guía.
      </Paragraph>
      <Paragraph>
        Se puede incluir un comentario y dejar observaciones acerca de la investigación realizada para futura auditoría.
        Además, es posible penalizar al usuario por la falta cometida, la posibilidad de penalizar o no es a criterio
        del moderador y al hacerlo, se le sumará el puntaje de penalización al perfil del usuario, que, según lo
        definido por los administradores, si el usuario supera ciertos límites, se lo bloqueará al usuario por una
        cantidad de días específicas o hasta de forma permanente.
      </Paragraph>
      <Paragraph>
        Las recomendaciones de penalización se explicarán más adelante por cada tipo de contenido reportado y según su
        categoría.
      </Paragraph>

      <Title>Rechazar un reporte</Title>
      <Paragraph>
        Si no se está de acuerdo con el reporte, simplemente se pasa a estado “Ignorado” y no se toma ninguna acción
        correctiva.
      </Paragraph>

      <Title>Tipos de reportes</Title>
      <Paragraph>
        Como se mencionó anteriormente, es posible reportar diferentes contenidos en la aplicación, y según el tipo de
        contenido y la categoría del reporte, el sistema aplicará automáticamente diferentes acciones correctivas, a
        continuación, se explica por cada tipo de contenido, sus categorías disponibles para reporte y las acciones
        correctivas utilizadas para cada una.
      </Paragraph>

      <Title>Comentarios</Title>
      <Paragraph>
        La sección de comentarios dentro de los eventos es donde ocurren las discusiones, se intercambian opiniones y se
        discute la calidad del evento en general. Las posibles categorías de reporte de comentarios de eventos son:
      </Paragraph>
      <Paragraph>
        <ul>
          <li>Contenido inapropiado</li>
          <li>Spam</li>
          <li>Otro</li>
        </ul>
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/5.png`)} />
      </div>
      <Paragraph>
        Al aceptar un reporte de comentario, cualquiera sea su categoría, se marcan como resueltos todos los reportes
        asociados y se elimina el comentario del sistema.
      </Paragraph>
      <SubTitle>Recomendaciones de penalización</SubTitle>
      <Paragraph>
        Según la categoría del reporte:
        <ol>
          <li>Contenido inapropiado</li>
          <ol style={listStyle}>
            <li>
              Penalización Alta: Para comentarios con contenido extremadamente inapropiado, que incumplen seriamente las
              normas de la comunidad.
            </li>
            <li>
              Penalización Media: Para comentarios con contenido inapropiado moderado, que incumplen las normas, pero no
              de manera extrema.
            </li>
            <li>
              Penalización Baja: Para comentarios con contenido inapropiado leve, que incumplen las normas, pero de
              manera mínima.
            </li>
          </ol>
          <li>Spam: se recomienda utilizar una penalización media</li>
          <li>Otro: la penalización queda a juicio del moderador</li>
        </ol>
      </Paragraph>

      <Title>Reseñas</Title>
      <Paragraph>
        Una reseña es una opinión escrita por un usuario sobre una productora, espacio de evento o artista en la
        aplicación Music Maniacs. Estas opiniones suelen describir y evaluar la experiencia del usuario con respecto a
        la entidad en cuestión, proporcionando detalles sobre aspectos como la calidad del evento, la actuación del
        artista o la experiencia en el espacio del evento. La moderación de reseñas es esencial para garantizar que las
        opiniones sean constructivas, respetuosas y pertinentes, y para mantener un entorno en línea positivo y
        enriquecedor para todos los miembros de la comunidad Music Maniacs. Las posibles categorías de reseñas de
        eventos son:
      </Paragraph>
      <Paragraph>
        <ul>
          <li>Contenido inapropiado</li>
          <li>Spam</li>
          <li>Otro</li>
        </ul>
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/6.png`)} />
      </div>

      <SubTitle>Recomendaciones de penalización</SubTitle>
      <Paragraph>
        Según la categoría del reporte:
        <ol>
          <li>Contenido inapropiado</li>
          <ol style={listStyle}>
            <li>
              Penalización Alta: Para reseñas con contenido extremadamente inapropiado, que incumplen seriamente las
              normas de la comunidad.
            </li>
            <li>
              Penalización Media: Para reseñas con contenido inapropiado moderado, que incumplen las normas, pero no de
              manera extrema.
            </li>
            <li>
              Penalización Baja: Para reseñas con contenido inapropiado leve, que incumplen las normas, pero de manera
              mínima.
            </li>
          </ol>
          <li>Spam: se recomienda utilizar una penalización media</li>
          <li>Otro: la penalización queda a juicio del moderador</li>
        </ol>
      </Paragraph>
      <Title>Videos</Title>
      <Paragraph>
        En la sección de multimedia de los eventos, los usuarios pueden compartir su experiencia en el evento a través
        de videos. Las posibles categorías de reporte de videos son:
        <ol>
          <li>Contenido inapropiado</li>
          <li>Spam</li>
          <li>No pertenece al evento</li>
          <li>Otro</li>
        </ol>
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/7.png`)} />
      </div>
      <Paragraph>Al aceptar un reporte de video, cualquiera sea su categoría, se marcan como resueltos todos los reportes asociados al mismo video y se elimina el video del sistema.</Paragraph>
      <SubTitle>Recomendaciones de penalización</SubTitle>
      <Paragraph>
      Según la categoría del reporte:
      <ol>
          <li>Contenido inapropiado</li>
          <ol style={listStyle}>
            <li>
            Penalización Alta: Para videos con contenido extremadamente inapropiado, que incumplen seriamente las normas de la comunidad.
            </li>
            <li>
            Penalización Media: Para videos con contenido inapropiado moderado, que incumplen las normas, pero no de manera extrema.
            </li>
            <li>
            Penalización Baja: Para videos con contenido inapropiado leve, que incumplen las normas, pero de manera mínima.
            </li>
          </ol>
          <li>Spam: se recomienda utilizar una penalización media</li>
          <li>No pertenece al evento: se recomienda usar penalización media.</li>
          <li>Otro: la penalización queda a juicio del moderador</li>
        </ol>
      </Paragraph>

      <Title>Eventos</Title>
      <Paragraph>Los eventos son el contenido principal del sistema, y cómo son creados y actualizados por los usuarios, es importante que no existan duplicados y que la información dentro de los mismos sea correcta. Las posibles categorías de reportes son:</Paragraph>
      <Paragraph>
        <ol>
          <li>Falso</li>
          <li>Spam</li>
          <li>Duplicado</li>
          <li>Artista incorrecto</li>
          <li>Productora incorrecta</li>
          <li>Espacio de eventos incorrecto</li>
          <li>Otro</li>
        </ol>
      </Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/8.png`)} />
      </div>
      <SubTitle>Falso, Spam u Otro</SubTitle>
      <Paragraph>Los reportes de eventos que contengan alguna de estas categorías, al ser aceptados se marcan como resueltos todos los reportes asociados que tengan alguna de estas categorías y se elimina el evento del sistema, si el evento tenía reportes asociados de otras categorías también se eliminan. Será trabajo del moderador investigar si el reporte es cierto y aceptarlo en caso de que corresponda.</Paragraph>
      <SubTitle>Duplicado</SubTitle>
      <Paragraph>Es posible que los usuarios creen un evento cuando el mismo en realidad ya existe. Cuando un usuario crea un reporte de evento duplicado, es necesario que sugiera cual es el evento original. En caso de aceptar el reporte, se copiarán todos los comentarios, videos y reseñas del evento duplicado al original, se eliminará el duplicado y los demás reportes asociados al evento duplicado también se eliminan.</Paragraph>
      <SubTitle>Arista, espacio de eventos o productora incorrecto</SubTitle>
      <Paragraph>
      Es posible que se haya creado un evento legítimo pero que el usuario que lo creó se haya equivocado al momento de seleccionar el artista, espacio de eventos o productora, y como estos campos no son editables por usuarios normales, es necesario corregir está información vía reportes.
      </Paragraph>
      <Paragraph>
      Al momento de crear el reporte, el usuario deberá seleccionar el perfil correcto, en caso de aceptar el reporte, se actualizará el perfil del evento con el sugerido por el usuario, las reseñas que haya tenido el perfil duplicado se mueven al perfil sugerido y se marcan como resueltos los reportes con la misma categoría y sugerencia de perfil sugerido.
      </Paragraph>
      <SubTitle>
      Recomendaciones de penalización
      </SubTitle>
      <ol>
        <li>Falso o Spam: se recomienda utilizar una penalización media.</li>
        <li>Duplicado: se recomienda no penalizar.</li>
        <li>Artista, productora o espacio de eventos incorrecto: se recomienda no penalizar.</li>
        <li>Otro: la penalización queda a juicio del moderador.</li>
      </ol>

      <Title>Perfiles de artistas, productoras y espacios de eventos</Title>
      <Paragraph>Para mayor flexibilidad, los usuarios pueden crear nuevos artistas, productoras y espacios de eventos. Estos perfiles se pueden reportar con las siguientes categorías:</Paragraph>
      <ol>
        <li>Falso</li>
        <li>Spam</li>
        <li>Duplicado</li>
        <li>Otro</li>
      </ol>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/9.png`)} />
      </div>
      <SubTitle>Falso, Spam u Otro</SubTitle>
      <Paragraph>Los reportes de perfiles con alguna de estas categorías, al ser aceptados se marcan como resueltos todos los reportes asociados que tengan alguna de estas categorías y se elimina el perfil del sistema, si el perfil tenía reportes asociados de otras categorías también se eliminan y todos los eventos asociados también se eliminan, se entiende que si el perfil asociado no era legítimo tampoco lo serán sus eventos asociados.</Paragraph>
      <Paragraph>Será trabajo del moderador investigar si el reporte es cierto y aceptarlo en caso de que corresponda.</Paragraph>
      <SubTitle>Duplicado</SubTitle>
      <Paragraph>Es posible que los usuarios creen un perfil cuando él mismo en realidad ya existe. Cuando un usuario crea un reporte de perfil duplicado, es necesario que sugiera cuál es el perfil original. En caso de aceptar el reporte, se actualizarán todos los eventos asociados con el perfil original junto con sus reseñas, se marcan como resueltos los reportes con la categoría duplicado y con la misma sugerencia de perfil y se elimina el perfil duplicado.</Paragraph>
      <SubTitle>Recomendaciones de penalización</SubTitle>
      <ol>
        <li>Falso o Spam: se recomienda utilizar una penalización media.</li>
        <li>Duplicado: se recomienda no penalizar.</li>
        <li>Otro: la penalización queda a juicio del moderador.</li>
      </ol>

      <Title>Versiones</Title>
      <Paragraph>Es posible que los usuarios modifiquen la información de eventos y perfiles (artistas, productoras y espacios de eventos) ya sea para actualizarlos o mejorar algún aspecto, para penalizar a los usuarios que vandalicen estas entidades con información falsa o contenido inapropiado, cada una de ellas tienen un historial de cambios realizados, donde se almacena el usuario que hizo la actualización y los cambios realizados.</Paragraph>
      <Paragraph>El reporte de versiones, si bien no aplica acciones correctivas ya que los usuarios mismos pueden volver a corregir a la información correcta lo realizado por la versión ilegítima, sirve para penalizar al autor de la versión.</Paragraph>
      <Paragraph>Es posible que usuarios sin permisos suficientes para realizar actualizaciones, realicen sugerencias de edición, si las sugerencias son adecuadas y mejores que la versión actual, puede utilizar la información para actualizar la entidad posterior a resolver el reporte.</Paragraph>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/10.png`)} />
      </div>
      <div className="container">
        <img alt="music-maniacs-logo" src={require(`../../assets/moderator/${theme}/11.png`)} />
      </div>
      <SubTitle>Recomendaciones de penalización</SubTitle>
      <Paragraph>
      Según la categoría del reporte:
      <ol>
          <li>Contenido inapropiado</li>
          <ol style={listStyle}>
            <li>
            Penalización Alta: Para contenido extremadamente inapropiado, que incumplen seriamente las normas de la comunidad.
            </li>
            <li>
            Penalización Media: Para contenido inapropiado moderado, que incumplen las normas, pero no de manera extrema.
            </li>
            <li>
            Penalización Baja: Para contenido inapropiado leve, que incumplen las normas, pero de manera mínima.
            </li>
          </ol>
          <li>Spam: se recomienda utilizar una penalización media</li>
          <li>No pertenece al evento: se recomienda usar penalización media.</li>
          <li>Otro: la penalización queda a juicio del moderador</li>
        </ol>
      </Paragraph>

      <Title>
      Agradecimientos
      </Title>
      <Paragraph>Por último, les agradecemos por el trabajo realizado en pos de mantener un ambiente seguro, respetuoso y enriquecedor para todos los miembros de nuestra comunidad. Su imparcialidad, compromiso y pasión por la comunidad son evidentes en cada acción que toman, gracias por contribuir de manera tan significativa al éxito de la plataforma.</Paragraph>
      <Paragraph>En caso de tener alguna duda o consulta no dude en contactarnos vía email a  musicmaniacspf@gmail.com.</Paragraph>
      <Paragraph>Gracias una vez más por ser parte de nuestra comunidad y su esfuerzo por mantenerla vibrante y acogedora.</Paragraph>
    </>
  );
};
