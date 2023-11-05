import { Paragraph, SubTitle, Title } from '../HelpCenterStyles';
import { QuestionsAcordeon } from './components/QuestionsAcordeon';

export const FAQ = () => {
  return (
    <div>
      <Title>Acerca de Music Maniacs</Title>
      <Paragraph>
        Music Maniacs es una comunidad en línea que busca ser el punto de reunión por excelencia entre amantes de la
        música, proveyendo un espacio en común para ver, comentar, discutir, calificar y descubrir eventos musicales,
        fomentando la creación de relaciones sociales entre los miembros.
      </Paragraph>

      <SubTitle>Misión</SubTitle>
      <Paragraph>
        En Music Maniacs, nuestra misión es unir a apasionados amantes de la música en vivo y proporcionarles un espacio
        dedicado para explorar, compartir y disfrutar de experiencias musicales. Queremos enriquecer la vida de las
        personas a través de la música, promoviendo la diversidad de géneros, fomentando la colaboración y facilitando
        la creación de conexiones significativas.
      </Paragraph>

      <SubTitle>Visión</SubTitle>
      <Paragraph>
        Nuestra visión es convertirnos en la comunidad en línea de referencia para los aficionados de la música en vivo
        de todo el mundo. Queremos que Music Maniacs sea el lugar al que acudan aquellos que buscan información
        confiable sobre eventos musicales, oportunidades para compartir sus experiencias, descubrir nuevos talentos y
        conectarse con otros amantes de la música.
      </Paragraph>

      <br />

      <Title>Funcionalidades principales</Title>
      <Paragraph>
        <ol>
          <li>Explorar y buscar eventos musicales. </li>
          <li>Leer y escribir reseñas y opiniones sobre eventos.</li>
          <li>Compartir videos de los eventos. </li>
          <li>Conectar con otros amantes de la música en vivo. </li>
          <li>Descubrir nuevos artistas y géneros musicales. </li>
          <li>Mantenerse informados sobre próximos eventos y noticias musicales.</li>
        </ol>
      </Paragraph>

      <br />

      <Title>Normas de la comunidad</Title>
      <Paragraph>
        Para asegurarnos de que todos tengan una experiencia positiva y apasionante, pero también segura y de confianza,
        hemos establecido algunas normas y directrices que aplican al uso de la plataforma. Estas pautas son esenciales
        para mantener un ambiente respetuoso y seguro para todos los miembros. Te pedimos que leas y sigas estas normas
        mientras participas en nuestra comunidad.
      </Paragraph>

      <SubTitle>Valores que promovemos</SubTitle>
      <Paragraph>
        <ol>
          <li>
            Pasión por la Música en Vivo: Valoramos la pasión compartida por la música en vivo. La música es el corazón
            de nuestra comunidad, y celebramos la diversidad de géneros y artistas.
          </li>
          <li>
            Respeto y Tolerancia: Fomentamos un ambiente de respeto mutuo y tolerancia. Todos los miembros son
            bienvenidos, independientemente de su origen, género, orientación o preferencias musicales.
          </li>
          <li>
            Honestidad y Autenticidad: Promovemos la honestidad y la autenticidad en nuestras reseñas y discusiones.
            Queremos que las opiniones sean genuinas y útiles para otros miembros.
          </li>
        </ol>
      </Paragraph>

      <SubTitle>Normas</SubTitle>
      <Paragraph>
        <ol>
          <li>
            Ten presente a los seres humanos. MusicManiacs es un lugar para celebrar la diversidad, no para atacar a
            grupos de personas marginadas o vulnerables. Todos tienen el derecho de utilizar MusicManiacs sin
            experimentar acoso, abuso ni recibir amenazas de violencia. Se prohibirán los contenidos que inciten a la
            violencia o promuevan odio sobre la base de la identidad o vulnerabilidad.
          </li>
          <li>
            Publica contenido auténtico y no hagas trampas ni manipules los contenidos (incluyendo spamming,
            manipulación de videos, contenido ilegítimo), ni interfieras o perturbes la comunidad de alguna otra forma.
          </li>
          <li>
            Respeta la intimidad de los demás. No está permitido instigar al acoso, por ejemplo revelando la información
            personal o confidencial de alguien.
          </li>
          <li>No publiques ni fomentes la publicación de contenido sexual o sugerente que involucre a menores.</li>
          <li>
            No tienes que utilizar tu nombre real para utilizar MusicManiacs, pero no te hagas pasar por un individuo o
            una entidad de forma engañosa o que genere confusión.
          </li>
          <li>
            Cumple con las leyes, y no publiques contenido ilegal ni solicites o facilites transacciones prohibidas o
            ilegales.
          </li>
        </ol>
      </Paragraph>

      <SubTitle>Moderación y reportes</SubTitle>
      <Paragraph>
        Si encuentras contenido inapropiado o que viola nuestras pautas, utiliza la función de reporte. Nuestros
        moderadores revisarán los reportes y tomarán las medidas adecuadas. Juntos, mantenemos una comunidad segura y
        respetuosa.
      </Paragraph>

      <br />

      <Title>Preguntas frecuentes</Title>
      <QuestionsAcordeon />
    </div>
  );
};
