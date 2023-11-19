import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const CategoryChart = ({ allCategories,categoryData }) => {
  const colors = generateColors(allCategories.length);
  // console.log(allCategories)
  const data = {
    labels: categoryData.map(data=>data._id),
    datasets: [
      // {
      //   label: 'Income',
      //   backgroundColor: 'rgba(75,192,192,0.2)',
      //   borderColor: 'rgba(75,192,192,1)',
      //   borderWidth: 1,
      //   data: categoryData.map(data=>data.totalIncome),
      // }
      {
        label: 'Expenses',
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: 1,
        data: categoryData.map(data=>data.totalExpense),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Set to false to allow manual adjustment
    responsive: true,
    // Set your desired height and width
    height: 400,
    width: 400,
  };

  return <Pie data={data} options={options}/>;
};

export default CategoryChart

// Function to generate dynamic colors
const generateColors = (count) => {
  const backgroundColors = [];
  const borderColors = [];

  for (let i = 0; i < count; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;

    backgroundColors.push(randomColor);
    borderColors.push(randomColor.replace(/[^,]+(?=\))/, '1'));
  }

  return { backgroundColors, borderColors };
};
