import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const AddNewAdminForm = ({ isOpen, onClose }) => {
  const schema = yup.object().shape({
    // const [adminName, setAdminName] = useState('');
    // const [adminEmail, setAdminEmail] = useState('');
    // const [adminID, setAdminID] = useState('');
    // const [adminPassword, setAdminPassword] = useState('');

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const newAdmin = { adminName, adminEmail, adminID, adminPassword };

    //   console.log('Submitting:', newAdmin);

    //   onClose();
    // };
    adminName: yup.string().required("Admin Name is required"),
    adminEmailEmail: yup
      .string()
      .email("Invalid email format")
      .required("Admin Email is required"),
    adminID: yup.string().required("Admin ID is required"),
    adminPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Submitting:", data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#001F3D] text-black p-6 rounded-lg shadow-lg w-[470px]">
        <h2 className="text-xl text-[#CCFFFF]  mb-4">
          Add New Admin for PC Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              Admin Full Name:
            </label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">
              Admin Email:
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">
              Admin ID:
            </label>
            <input
              type="text"
              value={adminID}
              onChange={(e) => setAdminID(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">
              Admin Password:
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#005F8F] p-2 rounded-md w-28 font-semibold text-[#CCFFFF]"
            >
              Add Admin
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#005F8F] p-1 w-28  font-semibold rounded-md text-[#CCFFFF]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdminForm;
