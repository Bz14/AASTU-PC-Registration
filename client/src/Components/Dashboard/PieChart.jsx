// src/components/PieChart.jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
};

export default PieChart;
