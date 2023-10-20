import React, { useEffect, useRef } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const style = getComputedStyle(document.body);
const secondaryColor = style.getPropertyValue('--secondary');

type Options = ChartOptions<'line'>;

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const LineChart = () => {
  const { theme } = useTheme();
  const textColor = cssVar('--text_color');
  const chartRef = useRef<ChartJS<'line', number[], string>>(null);

  useEffect(() => {
    // Las variables CSS se cambian un segundo despues de que se cambie "theme" por eso el timeout
    const timeout = setTimeout(() => {
      if (chartRef.current) {
        toggleChartTheme(chartRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [theme]);

  const toggleChartTheme = (chart: ChartJS<'line', number[], string>) => {
    const newTextColor = cssVar('--text_color');

    const xScale = chart.config.options?.scales?.x;
    const yScale = chart.config.options?.scales?.y;

    if (xScale && xScale.ticks?.color) {
      xScale.ticks.color = newTextColor;
    }

    if (yScale && yScale.ticks?.color) {
      yScale.ticks.color = newTextColor;
    }

    chart.update();
  };

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
          color: textColor
        }
      },
      x: {
        ticks: {
          color: textColor
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
