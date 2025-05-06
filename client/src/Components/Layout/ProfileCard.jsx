import PropTypes from "prop-types";

const ProfileCard = ({ user, onLogout }) => {
  return (
    <div className="w-60 absolute right-0 top-16 bg-[#000F1F] border-2 border-[#00AED9] rounded-lg p-4 z-50">
      <h3 className="font-bold text-[#CCFFFF]">{`Name : ${user?.name}`}</h3>
      <p className="text-gray-600">Role: Super Admin</p>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Logout
      </button>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default ProfileCard;
