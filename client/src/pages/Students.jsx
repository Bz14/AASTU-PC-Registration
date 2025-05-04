import { useState } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaQrcode,
} from "react-icons/fa";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchStudents = async (searchTerm = "") => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const response = await axios.get(
    `http://127.0.0.1:8000/api/students?search=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Fetched students:", response.data);
  return response.data;
};

const Students = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [editId, setEditId] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [tempStudent, setTempStudent] = useState(null);

  const {
    data: students = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students", searchTerm],
    queryFn: () => fetchStudents(searchTerm),
  });

  const addStudentMutation = useMutation({
    mutationFn: (newStudent) => {
      const token = localStorage.getItem("token");
      return axios.post(
        "http://127.0.0.1:8000/api/students/register",
        newStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      setCreatingNew(false);
      setEditingIndex(null);
      setTempStudent(null);
      setValidationError("");
    },
    onError: () => {
      setValidationError("Failed to add student. Please try again.");
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://127.0.0.1:8000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, updatedStudent }) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `http://127.0.0.1:8000/api/students/${id}`,
        updatedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      setEditingIndex(null);
      setTempStudent(null);
      setValidationError("");
    },
    onError: () => {
      setValidationError("Failed to update student. Please try again.");
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddRow = () => {
    setTempStudent({
      student_name: "",
      student_id: "",
      serial_number: "",
      pc_brand: "",
      pc_color: "",
      phoneNumber: "",
      email: "",
      status: "in",
    });
    setCreatingNew(true);
    setEditingIndex(students.length); // Set editing index to new row
    setValidationError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTempStudent((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const validateStudent = (student) => {
    const requiredFields = [
      "student_name",
      "student_id",
      "serial_number",
      "pc_brand",
      "pc_color",
      "phoneNumber",
      "email",
    ];
    return requiredFields.every((field) => student[field]?.trim() !== "");
  };

  const handleSave = () => {
    if (!tempStudent) return;

    if (!validateStudent(tempStudent)) {
      setValidationError("Please fill out all fields.");
      return;
    }

    const formData = { ...tempStudent };
    if (creatingNew) {
      addStudentMutation.mutate(formData);
    } else {
      updateStudentMutation.mutate({ id: editId, updatedStudent: formData });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditId(students[index].student_id);
    setTempStudent({ ...students[index] });
    setCreatingNew(false);
    setValidationError("");
  };

  const handleDelete = (index) => {
    const studentId = students[index].student_id;
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudentMutation.mutate(studentId);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCreatingNew(false);
    setTempStudent(null);
    setValidationError("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading students.</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus
          className="text-2xl cursor-pointer hover:text-blue-400 transition duration-300"
          title="Add New"
          aria-label="Add New Student"
          onClick={handleAddRow}
        />
        <div className="relative flex items-center rounded-lg border border-blue-500">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-lg placeholder-blue-300 w-64 h-10 flex-1 border-none outline-none focus:border-blue-500 focus:ring-0 transition duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="ml-2 cursor-pointer h-10 mr-2" />
        </div>
      </div>
      {validationError && (
        <p className="text-red-500 text-center mb-4">{validationError}</p>
      )}
      <div className="p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">ID Number</th>
                  <th className="p-3">PC Serial Number</th>
                  <th className="p-3">PC Brand</th>
                  <th className="p-3">PC Color</th>
                  <th className="p-3">Phone NO</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 && !creatingNew ? (
                  <tr>
                    <td colSpan="10" className="text-center p-2">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  [
                    ...students,
                    ...(creatingNew && tempStudent ? [tempStudent] : []),
                  ].map((student, index) => {
                    const isNewRow = creatingNew && index === students.length;
                    const isEditing = index === editingIndex || isNewRow;

                    return (
                      <tr
                        key={student.id || `new-${index}`}
                        className={`border-b border-blue-500 ${
                          isEditing ? "bg-white" : ""
                        }`}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_name"
                            value={
                              isEditing
                                ? tempStudent?.student_name || ""
                                : student.student_name || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_id"
                            value={
                              isEditing
                                ? tempStudent?.student_id || ""
                                : student.student_id || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="serial_number"
                            value={
                              isEditing
                                ? tempStudent?.serial_number || ""
                                : student.serial_number || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_brand"
                            value={
                              isEditing
                                ? tempStudent?.pc_brand || ""
                                : student.pc_brand || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_color"
                            value={
                              isEditing
                                ? tempStudent?.pc_color || ""
                                : student.pc_color || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={
                              isEditing
                                ? tempStudent?.phoneNumber || ""
                                : student.phoneNumber || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="email"
                            name="email"
                            value={
                              isEditing
                                ? tempStudent?.email || ""
                                : student.email || ""
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          />
                        </td>
                        <td className="p-2">
                          <select
                            name="status"
                            value={
                              isEditing
                                ? tempStudent?.status || "in"
                                : student.status || "in"
                            }
                            onChange={handleInputChange}
                            className="p-2 rounded-lg border-none w-full"
                            disabled={!isEditing}
                          >
                            <option value="in">In</option>
                            <option value="out">Out</option>
                          </select>
                        </td>
                        <td className="p-2 flex justify-start space-x-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={handleSave}
                                className="text-green-300"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-300"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <FaEdit
                              className="text-yellow-300 cursor-pointer hover:text-yellow-400"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          {!isNewRow && (
                            <FaTrash
                              className="text-red-300 cursor-pointer hover:text-red-400"
                              onClick={() => handleDelete(index)}
                            />
                          )}
                          {!isNewRow && (
                            <Link to={`/qrpage/${student.serial_number}`}>
                              <FaQrcode title="Generate QR Code" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
