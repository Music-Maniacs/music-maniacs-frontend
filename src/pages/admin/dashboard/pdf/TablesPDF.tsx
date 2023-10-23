import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { cssVar } from '../../../../utils/cssVar';
import { DashboardTableRow } from '../components/DashboardTable';

const styles = StyleSheet.create({
  tablesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  tableWTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 5px'
  },
  title: {
    margin: '10px 0',
    fontSize: '12px',
    fontWeight: 'bold'
  }
});

type Props = {
  metricsTable: DashboardTableProps;
  userTypesTable: DashboardTableProps;
};

export const TablesPDF = ({ metricsTable, userTypesTable }: Props) => {
  return (
    <View style={styles.tablesContainer}>
      <View style={styles.tableWTitleContainer}>
        <Text style={styles.title}>Métricas</Text>

        <Table
          headers={metricsTable.headers}
          rows={metricsTable.rows}
          customWidths={['60%', '13.3%', '13.3%', '13.3%']}
        />
      </View>

      <View style={styles.tableWTitleContainer}>
        <Text style={styles.title}>Tipos de Usuarios</Text>

        <Table headers={userTypesTable.headers} rows={userTypesTable.rows} />
      </View>
    </View>
  );
};

type DashboardTableProps = {
  rows: DashboardTableRow[];
  headers: string[];
  customWidths?: string[];
};

export const Table = ({ rows, headers, customWidths }: DashboardTableProps) => {
  const colWidth = `${100 / headers.length}%`;
  const highlightColor = cssVar('--highlight');
  const textColor = cssVar('--text_color');

  const tableStyles = StyleSheet.create({
    table: {
      // @ts-ignore -> Si existe el style. No se por que no lo reconoce.
      display: 'table',
      width: '100%',
      borderColor: textColor,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0
    },
    tableHeader: {
      margin: 'auto',
      flexDirection: 'row',
      backgroundColor: highlightColor,
      fontWeight: 'bold'
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row'
    },
    tableCol: {
      width: colWidth,
      borderStyle: 'solid',
      borderColor: textColor,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: {
      margin: '3px auto',
      fontSize: '8px'
    }
  });

  return (
    <View style={tableStyles.table}>
      <View style={tableStyles.tableHeader}>
        {headers.map((header, index) => {
          const customWidth = customWidths?.[index];

          const styleWidth = customWidth ? { width: customWidth } : {};

          return (
            <View style={{ ...tableStyles.tableCol, ...styleWidth }} key={`header-${index}`}>
              <Text style={tableStyles.tableCell}>{header}</Text>
            </View>
          );
        })}
      </View>

      {rows.map((row, index) => {
        return (
          <View style={tableStyles.tableRow} key={`row-${index}`}>
            {row.map((item, index) => {
              const customWidth = customWidths?.[index];

              const styleWidth = customWidth ? { width: customWidth } : {};

              return (
                <View style={{ ...tableStyles.tableCol, ...styleWidth }} key={`cell-${index}`}>
                  <Text style={tableStyles.tableCell}>
                    {/* @ts-ignore */}
                    {item.content ? item.content : item}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
