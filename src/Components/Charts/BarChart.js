import React from 'react';
import {
  defaults,
  CategoryScale,
  LinearScale,
  Chart,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

defaults.font.family = 'Poppins';
defaults.color = '#063651';
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DoughnutChart = ({ labelSet, dataSet }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#C1D6E3',
          font: {
            size: 10,
            weight: 600,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 30,
        borderSkipped: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  const colors = [
    '#085B91',
    '#F2EAA5',
    '#48C9AA',
    '#E98FB4',
    '#D26A6A',
    '#A863C8',
    '#8BE2A3',
    '#6C63CD',
  ];

  const data = {
    labels: [''],
    datasets: dataSet.map((value, index) => ({
      label: labelSet[index],
      data: [value],
      backgroundColor: colors[index],
      categoryPercentage: 1,
      barPercentage: 0.75,
      maxBarThickness: 24,
    })),
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
