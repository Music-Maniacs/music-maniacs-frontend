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
  ChartOptions,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../../../context/themeContext';
import 'chartjs-adapter-date-fns';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

type Props = {
  title: string;
  labels: string[];
  dataset: number[];
  id?: string;
};

export const LineChart = ({ title, labels, dataset, id }: Props) => {
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
    elements: {
      point: {
        radius: 2
      },
      line: {
        tension: 0.2,
        borderWidth: 2
      }
    },
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
            const labelFormatted = moment(item.label, 'MMM D, YYYY, h:mm:ss a').format('MMM D, YYYY');
            return `${labelFormatted}: ${value}`;
          }
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: dataset && dataset.length > 0 ? Math.max(...dataset) + 2 : undefined,
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor,
          stepSize: 1
        }
      },
      x: {
        type: 'time',
        time: {
          unit: false,
          minUnit: 'day'
        },
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

  return <Line id={id} ref={chartRef} data={data} options={options} />;
};
