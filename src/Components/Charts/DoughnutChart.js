import React from 'react';
import { defaults, Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

defaults.font.family = 'Poppins';
defaults.color = '#063651';
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labelSet, dataSet }) => {
  const options = {
    responsive: true,
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

  const data = {
    labels: labelSet,
    datasets: [
      {
        data: dataSet,
        backgroundColor: [
          '#085B91',
          '#F2EAA5',
          '#48C9AA',
          '#E98FB4',
          '#D26A6A',
          '#A863C8',
          '#8BE2A3',
          '#6C63CD',
        ],
        hoverOffset: 4,
        borderJoinStyle: 'round',
        borderRadius: 8,
        spacing: 12,
        cutout: '67%',
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
