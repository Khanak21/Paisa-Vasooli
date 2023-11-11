
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const YearlyChart = ({ yearlyData }) => {
  const data = {
    labels: yearlyData.map(data=>data.year),
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: yearlyData.map(data=>data.totalIncome),
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: yearlyData.map(data=>data.totalExpense),
      },
    ],
  };



  return <Bar data={data} />;
};

export default YearlyChart;