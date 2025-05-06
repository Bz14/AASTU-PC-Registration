import Dashboard from "../../pages/Dashboard"; // Import your components
import Students from "../../pages/Students";
import Admins from "../../pages/Admins";
import Settings from "../../pages/Settings";
import QrCodePage from "../../pages/QrPage";
import PropTypes from "prop-types";

const ContentSection = ({ selectedItem }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "admins":
        return <Admins />;
      case "settings":
        return <Settings />;
      case "qrcode":
        return <QrCodePage />;
      default:
        return null; // Return null for empty static content
    }
  };

  return (
    <div
      className={`content-section flex-grow ml-1.5 mr-1.5 sm:ml-0  transition-all duration-300  h-[99%]  overflow-auto rounded-lg no-scrollbar`}
    >
      {renderContent()}
    </div>
  );
};
ContentSection.propTypes = {
  selectedItem: PropTypes.string.isRequired,
};

export default ContentSection;
