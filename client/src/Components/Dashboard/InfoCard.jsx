// src/components/InfoCard.jsx
import PropTypes from "prop-types";

const InfoCard = ({ title, value }) => {
  return (
    <div
      className="p-4 navbar rounded-md shadow-md "
      style={{
        border: `solid var(--text-color) 2px`, // Apply shadow using --text-color
      }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-xl">{value}</p>
    </div>
  );
};
InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InfoCard;
