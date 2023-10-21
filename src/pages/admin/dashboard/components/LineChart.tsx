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

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

type Props = {
  title: string;
  labels: string[];
  dataset: number[];
};

export const LineChart = ({ title, labels, dataset }: Props) => {
  const { theme } = useTheme();
  const textColor = cssVar('--text_color');
  const opacity = '40';
  const gridColor = textColor + opacity;
  const secondaryColor = cssVar('--secondary');
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
    const newGridColor = newTextColor + opacity;

    const xScale = chart.config.options?.scales?.x;
    const yScale = chart.config.options?.scales?.y;

    if (xScale && xScale.ticks?.color && xScale.grid?.color) {
      xScale.ticks.color = newTextColor;
      xScale.grid.color = newGridColor;
    }

    if (yScale && yScale.ticks?.color && yScale.grid?.color) {
      yScale.ticks.color = newTextColor;
      yScale.grid.color = newGridColor;
    }

    if (chart.config.options?.plugins?.title) {
      chart.config.options.plugins.title.color = newTextColor;
    }

    chart.update();
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        align: 'start',
        color: textColor,
        font: {
          size: 16
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: () => '',
          label: (item) => {
            const value = item.dataset.data[item.dataIndex];
            return `${item.label}: ${value}`;
          }
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      },
      x: {
        grid: {
          color: gridColor
        },
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
        data: dataset,
        borderColor: secondaryColor,
        backgroundColor: secondaryColor
      }
    ]
  };

  return <Line ref={chartRef} data={data} options={options} />;
};
