// src/components/BarChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import PropTypes from "prop-types";

const BarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

BarChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default BarChart;
