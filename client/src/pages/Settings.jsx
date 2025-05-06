import React from "react";
import PropTypes from "prop-types";

const Settings = ({ setIsStatusVisible }) => {
  const [isChecked, setIsChecked] = React.useState(true); // Default to true to show the status column

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setIsStatusVisible(newValue); // Propagate change to the parent component
  };

  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <span className="text-blue-300">Show Status Column</span>
      </label>
    </div>
  );
};
Settings.propTypes = {
  setIsStatusVisible: PropTypes.func.isRequired,
};

export default Settings;
