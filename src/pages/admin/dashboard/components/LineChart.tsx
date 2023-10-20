import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../../../context/themeContext';
import colors from '../../../../styles/_colors.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const style = getComputedStyle(document.body);
const secondaryColor = style.getPropertyValue('--secondary');

type Options = ChartOptions<'line'>;

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const LineChart = () => {
  const { theme } = useTheme();
  const textColor = cssVar('--text_color');
  const chartRef = useRef();

  useEffect(() => {
    console.log(textColor);
    console.log('ss', colors.text_color);

    if (chartRef.current) {
      // @ts-ignore
      chartRef.current.update();
    }
  }, [theme]);

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const options: Options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          color: colors.text_color
        }
      },
      x: {
        ticks: {
          color: colors.text_color
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4],
        borderColor: secondaryColor,
        backgroundColor: secondaryColor
      }
    ]
  };

  return <Line ref={chartRef} data={data} options={options} />;
};
