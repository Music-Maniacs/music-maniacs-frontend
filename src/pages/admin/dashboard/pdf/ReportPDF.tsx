import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { cssVar } from '../../../../utils/cssVar';
import moment from 'moment';
import { GraphPDF } from './GraphPDF';
import RobotoRegular from '../../../../assets/fonts/Roboto-Regular.ttf';
import RobotoBold from '../../../../assets/fonts/Roboto-Bold.ttf';
import { TablesPDF } from './TablesPDF';
import { DashboardTableProps } from '../components/DashboardTable';

Font.register({
  family: 'Roboto',
  fonts: [{ src: RobotoRegular }, { src: RobotoBold, fontWeight: 'bold' }]
});

type Props = {
  startDate: string;
  endDate: string;
  metricsTable: DashboardTableProps;
  userTypesTable: DashboardTableProps;
  canViewGraphs: boolean;
  canViewTables: boolean;
};

export const ReportPDF = ({
  startDate,
  endDate,
  metricsTable,
  userTypesTable,
  canViewGraphs,
  canViewTables
}: Props) => {
  const bgColor = cssVar('--box_background');
  const textColor = cssVar('--text_color');
  const primaryColor = cssVar('--primary');

  // Los tengo que definir adentro porque sino no me toma bien las variables al cambiar el theme
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: textColor,
      fontFamily: 'Roboto',
      padding: '20px'
    },
    title: {
      borderBottom: `2px solid ${primaryColor}`,
      marginBottom: '5px',
      width: '210px',
      fontWeight: 'bold'
    },
    text: {
      fontSize: '10px',
      width: '100%'
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
          <Text style={styles.title}>Music Maniacs | Métricas</Text>
          <Text style={styles.text}>Reporte generado el: {moment().format('DD-MM-YYYY')}</Text>
          <Text style={styles.text}>
            {`Período Consultado: Desde ${startDate ? moment(startDate).format('DD-MM-YYYY') : ' - '} Hasta ${
              endDate ? moment(endDate).format('DD-MM-YYYY') : ' - '
            }`}
          </Text>
        </View>
        {canViewGraphs && <GraphPDF />}
        {canViewTables && <TablesPDF metricsTable={metricsTable} userTypesTable={userTypesTable} />}{' '}
      </Page>
    </Document>
  );
};
