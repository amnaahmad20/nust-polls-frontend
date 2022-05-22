import React, { useState, useEffect } from 'react';
import './BarChart.css';
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
        display: displayLegend,
        position: 'right',
        labels: {
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    // animation: {
    //   duration: 800,
    //   easing: 'easeInSine',
    // },
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
      maxBarThickness: 25,
      minBarLength: 5,
    })),
  };

  return (
    <div className="bar-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
