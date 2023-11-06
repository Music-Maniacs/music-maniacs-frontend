import { Paragraph, SubTitle, Title } from './HelpCenterStyles';

import { ModerationAcordeon } from './moderation/ModerationAcordeon';

export const ModeratorManual = () => {
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
      <Paragraph>El contenido a moderar es el siguiente:</Paragraph>

      <Paragraph as={'ul'}>
        <li>Comentarios</li>
        <li>Reseñas</li>
        <li>Videos</li>
        <li>Eventos</li>
        <li>Perfiles de artistas, productoras y espacios de eventos</li>
        <li>Versiones</li>
      </Paragraph>

      <Paragraph>
        A continuación, te explicaremos el funcionamiento de las herramientas y como resolver cada tipo de reporte según
        su categoría y entidad asociada.
      </Paragraph>

      <Title>Moderación de contenido</Title>
      <ModerationAcordeon />

      <Title>Agradecimientos</Title>
      <Paragraph>
        Por último, les agradecemos por el trabajo realizado en pos de mantener un ambiente seguro, respetuoso y
        enriquecedor para todos los miembros de nuestra comunidad. Su imparcialidad, compromiso y pasión por la
        comunidad son evidentes en cada acción que toman, gracias por contribuir de manera tan significativa al éxito de
        la plataforma.
      </Paragraph>
      <Paragraph>
        En caso de tener alguna duda o consulta no dude en contactarnos vía email a musicmaniacspf@gmail.com.
      </Paragraph>
      <Paragraph>
        Gracias una vez más por ser parte de nuestra comunidad y su esfuerzo por mantenerla vibrante y acogedora.
      </Paragraph>
    </>
  );
};
