import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const AddNewStudentForm = ({ isOpen, onClose }) => {
  const schema = yup.object().shape({
    studentName: yup.string().required("Student Name is required"),
    studentEmail: yup
      .string()
      .email("Invalid email format")
      .required("Student Email is required"),
    studentID: yup.string().required("Student ID is required"),
    studentPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    pcSerial: yup.string().required("PC Serial is required"),
    pcBrand: yup.string().required("PC Brand is required"),
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
        <h2 className="text-xl text-[#CCFFFF] mb-4">
          Add New Student for PC Registration
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              Student Full Name:
            </label>
            <input
              type="text"
              {...register("studentName")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.studentName && (
              <p className="text-red-500 text-sm">
                {errors.studentName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              Student Email:
            </label>
            <input
              type="email"
              {...register("studentEmail")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.studentEmail && (
              <p className="text-red-500 text-sm">
                {errors.studentEmail.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              Student ID:
            </label>
            <input
              type="text"
              {...register("studentID")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.studentID && (
              <p className="text-red-500 text-sm">{errors.studentID.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              Student Password:
            </label>
            <input
              type="password"
              {...register("studentPassword")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.studentPassword && (
              <p className="text-red-500 text-sm">
                {errors.studentPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              PC Serial:
            </label>
            <input
              type="text"
              {...register("pcSerial")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.pcSerial && (
              <p className="text-red-500 text-sm">{errors.pcSerial.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">
              PC Brand:
            </label>
            <input
              type="text"
              {...register("pcBrand")}
              className="border-none rounded-md p-2 w-96"
            />
            {errors.pcBrand && (
              <p className="text-red-500 text-sm">{errors.pcBrand.message}</p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#005F8F] p-2 rounded-md w-28 font-semibold text-[#CCFFFF]"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#005F8F] p-1 w-28 font-semibold rounded-md text-[#CCFFFF]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddNewStudentForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNewStudentForm;
