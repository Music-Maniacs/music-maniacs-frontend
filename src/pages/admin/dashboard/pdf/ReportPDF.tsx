import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { cssVar } from '../../../../utils/cssVar';
import moment from 'moment';
import { GraphPDF } from './GraphPDF';

export const ReportPDF = () => {
  const bgColor = cssVar('--body_bg');
  const textColor = cssVar('--text_color');

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: textColor
    }
  });

  return (
    <Document
      author="MusicManiacs"
      creator="MusicManiacs"
      language="es"
      title={`Reporte Music Maniacs ${moment().format('DD-MM-YYYY')}`}
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View>
          <Text>Music Maniacs | Métricas</Text>
          <Text>Reporte generado el: {moment().format('DD-MM-YYYY')}</Text>
          <Text>Período Consultado</Text>
        </View>

        <GraphPDF />
      </Page>
    </Document>
  );
};
