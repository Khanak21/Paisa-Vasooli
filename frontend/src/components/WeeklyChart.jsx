import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
const WeeklyChart = ({ weeklyData }) => {
  const data = {
    labels: weeklyData?.map(data=>data.date),
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: weeklyData?.map(data=>data.totalIncome),
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: weeklyData?.map(data=>data.totalExpense),
      },
    ],
  };

  return <Bar data={data} />;
};

export default WeeklyChart;
