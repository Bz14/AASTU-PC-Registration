import { useState, useEffect } from "react";
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchAdmins = async (searchTerm = "") => {
  const token = localStorage.getItem("token");

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
  const [tempAdmin, setTempAdmins] = useState(null);

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
      setTempAdmins(null);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, updatedAdmin }) => {
      const token = localStorage.getItem("token");
      return axios.put(`http://127.0.0.1:8000/api/admins/${id}`, updatedAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      setEditingIndex(null);
      setTempAdmins(null);
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
  };

  const handleAddRow = () => {
    setTempAdmins([
      ...admins,
      {
        username: "",
        admin_id: "",
        phoneNumber: "",
        email: "",
        password: "",
        profile_picture: "",
      },
    ]);

    setCreatingNew(true);
    setEditingIndex(admins.length);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTempAdmins((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const updatedAdmins = [...admins];
    updatedAdmins[index] = { ...updatedAdmins[index], profile_picture: file };
    setTempAdmins(updatedAdmins[index]);
  };

  const handleSave = (index) => {
    const admin = admins[index];

    if (creatingNew) {
      if (
        !admin.username ||
        !admin.admin_id ||
        !admin.phoneNumber ||
        !admin.email ||
        !admin.password
      ) {
        alert("Please fill in all fields before saving.");
        return;
      }

      const formData = new FormData();
      formData.append("username", admin.username);
      formData.append("admin_id", admin.admin_id);
      formData.append("phoneNumber", admin.phoneNumber);
      formData.append("email", admin.email);
      formData.append("password", admin.password);

      if (admin.profile_picture) {
        formData.append("profile_picture", admin.profile_picture);
      }

      addAdminMutation.mutate(formData);
    } else {
      updateStudentMutation.mutate({
        id: editId,
        updatedAdmin: {
          username: admin.username,
          admin_id: admin.admin_id,
          phoneNumber: admin.phoneNumber,
          email: admin.email,
          password: admin.password,
          profile_picture: admin.profile_picture,
        },
      });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditId(admins[index].admin_id);
    setCreatingNew(false);
  };

  const handleDelete = (index) => {
    const adminId = admins[index].admin_id;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmDelete) return;

    deleteAdminMutation.mutate(adminId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading admins</div>;

  return (
    <div className="navbar min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus
          className=" text-2xl cursor-pointer hover:text-blue-400 transition duration-300"
          title="Add New Admin"
          aria-label="Add New Admin"
          onClick={handleAddRow}
        />
        <div className="relative flex items-center navbar rounded-lg border border-blue-500">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 navbar rounded-lg placeholder-blue-300 w-64 h-10 flex-1 border-none outline-none focus:border-blue-500 focus:ring-0 transition duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className=" ml-2 cursor-pointer h-10 mr-2" />
        </div>
      </div>

      <div className="navbar p-6 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left navbar border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3 border-b border-blue-500">#</th>
                  <th className="p-3 border-b border-blue-500">Name</th>
                  <th className="p-3 border-b border-blue-500">ID Number</th>
                  <th className="p-3 border-b border-blue-500">Phone Number</th>
                  <th className="p-3 border-b border-blue-500">Email</th>
                  <th className="p-3 border-b border-blue-500">
                    Profile Picture
                  </th>
                  <th className="p-3 border-b border-blue-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No admins found.
                    </td>
                  </tr>
                ) : (
                  admins
                    .filter((admin) =>
                      admin.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((admin, index) => (
                      <tr
                        key={admin.id || index}
                        className={`navbar ${
                          index === editingIndex ? "bg-[#002B6C]" : ""
                        }`}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2  ">
                          <input
                            type="text"
                            name="username"
                            value={admin.username}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                            style={{ border: "solid var(--button-color) 2px" }}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="admin_id"
                            value={admin.admin_id}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                            style={{ border: "solid var(--button-color) 2px" }}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={admin.phoneNumber}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                            style={{ border: "solid var(--button-color) 2px" }}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="email"
                            name="email"
                            value={admin.email}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                            style={{ border: "solid var(--button-color) 2px" }}
                          />
                        </td>

                        <td className="p-2">
                          <input
                            type="file"
                            name="profile_picture"
                            onChange={(event) => handleFileChange(event, index)}
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                            style={{ border: "solid var(--button-color) 2px" }}
                          />
                        </td>
                        <td className="p-2">
                          {index === editingIndex ? (
                            <FaSave
                              className="navbar text-xl cursor-pointer mr-2"
                              title="Save"
                              onClick={() => handleSave(index)}
                            />
                          ) : (
                            <FaEdit
                              className="navbar text-xl cursor-pointer mr-2"
                              title="Edit"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          <FaTrash
                            className="text-red-600 cursor-pointer hover:text-red-400 transition duration-300"
                            onClick={() => handleDelete(index)}
                          />
                        </td>
                      </tr>
                    ))
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
