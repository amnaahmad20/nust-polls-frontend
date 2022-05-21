import React, { useState, useEffect } from 'react';
import './DoughnutChart.css';
import { defaults, Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

defaults.font.family = 'Poppins';
defaults.color = '#063651';
Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labelSet, dataSet }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [displayLegend, setDisplayLegend] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    width < 752 ? setDisplayLegend(false) : setDisplayLegend(true);
  }, [width]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: displayLegend,
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
        borderJoinStyle: 'round',
        borderRadius: 7,
        spacing: 3,
        cutout: '67%',
      },
    ],
  };

  return (
    <div className="doughnut-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
