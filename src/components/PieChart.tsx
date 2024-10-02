import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useAppSelector } from '../redux/hooks';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
    const {categories} = useAppSelector(state => state.category)
    const getRandomLightColor = () => {
        const r = Math.floor(Math.random() * 156) + 100; // Light red range
        const g = Math.floor(Math.random() * 156) + 100; // Light green range
        const b = Math.floor(Math.random() * 156) + 100; // Light blue range
        return `rgb(${r}, ${g}, ${b})`;
    };

  const data = {
    labels: categories.map((category) => {
        return category.name
    }),
    datasets: [
      {
        label: 'Total expenses',
        data: categories.map((category) => {
            return category.totalExpenses
        }),
        backgroundColor: categories.map(() => getRandomLightColor()),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as any, // Use a specific string literal
      },
      title: {
        display: true,
        text: 'Spending by category',
      },
    },
  };

  return categories.length !== 0 && <Pie data={data} options={options} />;
};

export default PieChart;
