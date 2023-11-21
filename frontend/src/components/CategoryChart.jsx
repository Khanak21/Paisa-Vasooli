import React from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryChart = ({ allCategories, categoryData, thememode }) => {
  const colors = generateColors(allCategories.length, thememode);

  const lightTheme = {
    colorText: 'black',
    income: 'rgba(75,192,192,0.5)',
    incomeBorder: 'rgba(75,192,192,1)',
    expenses: 'rgba(255,99,132,0.5)',
    expensesBorder: 'rgba(255,99,132,1)',
  };

  const darkTheme = {
    colorText: 'white',
    income: 'rgba(34,139,34,0.5)',
    incomeBorder: 'rgba(34,139,34,1)',
    expenses: 'rgba(165,42,42,0.5)',
    expensesBorder: 'rgba(165,42,42,1)',
  };

  const theme = thememode === 'dark' ? darkTheme : lightTheme;

  const data = {
    labels: categoryData.map((data) => data._id),
    datasets: [
      {
        label: 'Income',
        backgroundColor: colors.incomeBackgroundColors,
        borderColor: colors.incomeBorderColors,
        borderWidth: 1,
        data: categoryData.map((data) => data.totalIncome),
      },
      {
        label: 'Expenses',
        backgroundColor: colors.expensesBackgroundColors,
        borderColor: colors.expensesBorderColors,
        borderWidth: 1,
        data: categoryData.map((data) => data.totalExpense),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    height: 500,
    width: 600,
  };

  const option = {
    scales: {
      x: {
        ticks: {
          color: theme.colorText,
        },
      },
      y: {
        ticks: {
          color: theme.colorText,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.colorText,
        },
      },
    },
  };

  return <Pie data={data} options={options} option={option} />;
};

export default CategoryChart;

// Function to generate dynamic colors
const generateColors = (count, thememode) => {
  const backgroundColors = [];
  const borderColors = [];

  const generateColor = (index) => {
    const hue = (index * (360 / count)) % 360;
    const lightness = thememode === 'dark' ? 25 : 75;
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  for (let i = 0; i < count; i++) {
    backgroundColors.push(generateColor(i));
    borderColors.push(generateColor(i));
  }

  return {
    incomeBackgroundColors: backgroundColors,
    incomeBorderColors: borderColors,
    expensesBackgroundColors: backgroundColors,
    expensesBorderColors: borderColors,
  };
};
