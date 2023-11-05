import { styled } from 'styled-components';
import { Paragraph, SubTitle, Title } from '../HelpCenterStyles';

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
    </div>
  );
};
