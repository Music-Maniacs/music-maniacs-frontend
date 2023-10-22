import React from 'react';
import { Image, StyleSheet, View } from '@react-pdf/renderer';
import {
  COMMENTS_CHART_ID,
  NEW_ARTISTS_CHART_ID,
  NEW_EVENTS_CHART_ID,
  NEW_VENUES_CHART_ID,
  REVIEWS_CHART_ID,
  USER_CHART_ID
} from '../context/types';

const styles = StyleSheet.create({
  graphsContainer: {
    flexDirection: 'column',
    gap: '5px',
    padding: '10px'
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '5px'
  },
  graph: {
    height: '150px',
    width: '33%'
  }
});

export const GraphPDF = () => {
  const firstRow = [USER_CHART_ID, COMMENTS_CHART_ID, REVIEWS_CHART_ID];
  const secondRow = [NEW_EVENTS_CHART_ID, NEW_ARTISTS_CHART_ID, NEW_VENUES_CHART_ID];
  return (
    <View style={styles.graphsContainer}>
      <View style={styles.graphRow}>
        {firstRow.map((id) => (
          <Image
            key={id}
            style={styles.graph}
            src={(document.getElementById(id) as HTMLCanvasElement).toDataURL('image/jpg', 1)}
          />
        ))}
      </View>

      <View style={styles.graphRow}>
        {secondRow.map((id) => (
          <Image
            key={id}
            style={styles.graph}
            src={(document.getElementById(id) as HTMLCanvasElement).toDataURL('image/jpg', 1)}
          />
        ))}
      </View>
    </View>
  );
};
