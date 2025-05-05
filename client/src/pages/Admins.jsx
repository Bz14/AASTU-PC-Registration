import { useState } from "react";
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchAdmins = async (searchTerm = "") => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get(
    `http://127.0.0.1:8000/api/admins?search=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const Admins = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tempAdmin, setTempAdmin] = useState(null);
  const [validationError, setValidationError] = useState("");

  const {
    data: admins = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admins", searchTerm],
    queryFn: () => fetchAdmins(searchTerm),
  });

  const addAdminMutation = useMutation({
    mutationFn: (newAdmin) => {
      const token = localStorage.getItem("token");
      return axios.post("http://127.0.0.1:8000/api/admins/register", newAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      setCreatingNew(false);
      setEditingIndex(null);
      setTempAdmin(null);
      setValidationError("");
    },
    onError: () => {
      setValidationError("Failed to add admin. Please try again.");
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: ({ id, updatedAdmin }) => {
      const token = localStorage.getItem("token");
      return axios.put(`http://127.0.0.1:8000/api/admins/${id}`, updatedAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      setEditingIndex(null);
      setTempAdmin(null);
      setValidationError("");
    },
    onError: () => {
      setValidationError("Failed to update admin. Please try again.");
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: (id) => {
      const token = localStorage.getItem("token");
      return axios.delete(`http://127.0.0.1:8000/api/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setValidationError("");
  };

  const handleAddRow = () => {
    setTempAdmin({
      username: "",
      admin_id: "",
      phoneNumber: "",
      email: "",
      password: "",
      profile_picture: "",
    });
    setCreatingNew(true);
    setEditingIndex(admins.length);
    setValidationError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTempAdmin((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setTempAdmin((prev) => ({ ...prev, profile_picture: file }));
  };

  const validateAdmin = (admin) => {
    const requiredFields = [
      "username",
      "admin_id",
      "phoneNumber",
      "email",
      "password",
    ];
    return requiredFields.every((field) => admin[field]?.trim() !== "");
  };

  const handleSave = () => {
    console.log(tempAdmin);
    if (!tempAdmin) return;

    if (!validateAdmin(tempAdmin)) {
      setValidationError("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("username", tempAdmin.username);
    formData.append("admin_id", tempAdmin.admin_id);
    formData.append("phoneNumber", tempAdmin.phoneNumber);
    formData.append("email", tempAdmin.email);
    formData.append("password", tempAdmin.password);
    if (tempAdmin.profile_picture) {
      formData.append("profile_picture", tempAdmin.profile_picture);
    }

    if (creatingNew) {
      addAdminMutation.mutate(formData);
    } else {
      updateAdminMutation.mutate({
        id: editId,
        updatedAdmin: formData,
      });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditId(admins[index].admin_id);
    setTempAdmin({ ...admins[index] });
    setCreatingNew(false);
    setValidationError("");
  };

  const handleDelete = (index) => {
    const adminId = admins[index].admin_id;
    if (window.confirm("Are you sure you want to delete this admin?")) {
      deleteAdminMutation.mutate(adminId);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCreatingNew(false);
    setTempAdmin(null);
    setValidationError("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading admins.</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus
          className="text-2xl cursor-pointer hover:text-blue-400 transition duration-300"
          title="Add New Admin"
          aria-label="Add New Admin"
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
                  <th className="p-3">Phone Number</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Password</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 && !creatingNew ? (
                  <tr>
                    <td colSpan="7" className="text-center p-2">
                      No admins found.
                    </td>
                  </tr>
                ) : (
                  [...admins, ...(creatingNew && tempAdmin ? [tempAdmin] : [])]
                    .filter((admin) =>
                      admin.username
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((admin, index) => {
                      const isNewRow = creatingNew && index === admins.length;
                      const isEditing = index === editingIndex || isNewRow;

                      return (
                        <tr
                          key={admin.id || `new-${index}`}
                          className={`border-b border-blue-500 ${
                            isEditing ? "bg-white" : ""
                          }`}
                        >
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="username"
                              value={
                                isEditing
                                  ? tempAdmin?.username || ""
                                  : admin.username || ""
                              }
                              onChange={handleInputChange}
                              className="p-2 rounded-lg border-none w-full"
                              disabled={!isEditing}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              name="admin_id"
                              value={
                                isEditing
                                  ? tempAdmin?.admin_id || ""
                                  : admin.admin_id || ""
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
                                  ? tempAdmin?.phoneNumber || ""
                                  : admin.phoneNumber || ""
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
                                  ? tempAdmin?.email || ""
                                  : admin.email || ""
                              }
                              onChange={handleInputChange}
                              className="p-2 rounded-lg border-none w-full"
                              disabled={!isEditing}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="password"
                              name="password"
                              value={
                                isEditing
                                  ? tempAdmin?.password || ""
                                  : admin.password || ""
                              }
                              onChange={handleInputChange}
                              className="p-2 rounded-lg border-none w-full"
                              disabled={!isEditing}
                            />
                          </td>
                          {/* <td className="p-2">
                            {isEditing ? (
                              <input
                                type="file"
                                name="profile_picture"
                                onChange={handleFileChange}
                                className="p-2 rounded-lg border-none w-full"
                              />
                            ) : (
                              <span>
                                {admin.profile_picture ? (
                                  <img
                                    src={
                                      typeof admin.profile_picture === "string"
                                        ? `http://127.0.0.1:8000/${admin.profile_picture}`
                                        : URL.createObjectURL(
                                            admin.profile_picture
                                          )
                                    }
                                    alt="Profile"
                                    className="w-10 h-10 object-cover"
                                  />
                                ) : (
                                  "N/A"
                                )}
                              </span>
                            )}
                          </td> */}
                          <td className="p-2 flex justify-start space-x-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="text-green-300 hover:text-green-400"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-gray-300 hover:text-gray-400"
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

export default Admins;
