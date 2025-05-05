import { useState, useEffect } from "react";
import BarChart from "../Components/Dashboard/BarChart";
import InfoCard from "../Components/Dashboard/InfoCard";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";

const fetchAdmins = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get("http://150.40.238.179:8000/api/admins", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchPCs = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get("http://150.40.238.179:8000/api/pcs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const Dashboard = () => {
  const [barData1, setBarData1] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Admin Registrations",
        data: new Array(12).fill(0),
        backgroundColor: "#e2ad00e1",
      },
    ],
  });

  const [barData2, setBarData2] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total PC Registrations of the Year",
        data: new Array(12).fill(0),
        backgroundColor: "#22C55E",
      },
    ],
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ["admins"],
        queryFn: fetchAdmins,
      },
      {
        queryKey: ["pcs"],
        queryFn: fetchPCs,
      },
    ],
  });

  console.log("Results: ", results, results[0], results[1]);

  const adminsQuery = results[0] || {};
  const pcsQuery = results[1] || {};

  useEffect(() => {
    if (adminsQuery.isSuccess && pcsQuery.isSuccess) {
      const admins = Array.isArray(adminsQuery.data) ? adminsQuery.data : [];
      const pcs = Array.isArray(pcsQuery.data) ? pcsQuery.data : [];

      const adminData = new Array(12).fill(0);
      admins.forEach((admin) => {
        const createdAt = admin.createdAt ? new Date(admin.createdAt) : null;
        if (createdAt && !isNaN(createdAt.getMonth())) {
          adminData[createdAt.getMonth()] += 1;
        }
      });

      setBarData1((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: adminData,
          },
        ],
      }));

      const pcData = new Array(12).fill(0);
      pcs.forEach((pc) => {
        const createdAt = pc.createdAt ? new Date(pc.createdAt) : null;
        if (createdAt && !isNaN(createdAt.getMonth())) {
          pcData[createdAt.getMonth()] += 1;
        }
      });
      setBarData2((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: pcData,
          },
        ],
      }));
    }
  }, [
    adminsQuery.isSuccess,
    adminsQuery.data,
    pcsQuery.isSuccess,
    pcsQuery.data,
  ]);

  if (adminsQuery.isLoading || pcsQuery.isLoading) {
    return (
      <div className="p-4 w-full h-full navbar">
        <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
        <p className="text-gray-500">Loading dashboard data...</p>
      </div>
    );
  }

  if (adminsQuery.isError || pcsQuery.isError) {
    return (
      <div className="p-4 w-full h-full navbar">
        <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
        <p className="text-red-500">
          Error loading data:{" "}
          {adminsQuery.error?.message ||
            pcsQuery.error?.message ||
            "Unknown error"}
        </p>
      </div>
    );
  }

  const totalAdminRegistrations = Array.isArray(adminsQuery.data)
    ? adminsQuery.data.length
    : 0;
  const totalPCRegistrations = Array.isArray(pcsQuery.data)
    ? pcsQuery.data.length
    : 0;

  return (
    <div className="p-4 w-full h-full navbar">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 custom:grid-cols-[55%,45%] gap-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
          <div
            className="p-4 rounded-md shadow-md"
            style={{ border: `solid var(--text-color) 2px` }}
          >
            <h2 className="text-lg font-semibold mb-2">
              Admin Registrations Over the Year
            </h2>
            <BarChart data={barData1} />
          </div>
          <div
            className="p-4 rounded-md shadow-md"
            style={{ border: `solid var(--text-color) 2px` }}
          >
            <h2 className="text-lg font-semibold mb-2">
              PC Registrations Over the Year
            </h2>
            <BarChart data={barData2} />
          </div>
        </div>

        <div
          className="p-4 rounded-md shadow-md flex flex-col gap-2"
          style={{ border: "solid var(--text-color) 2px" }}
        >
          <InfoCard
            title="Total Admin Registrations"
            value={totalAdminRegistrations}
          />
          <InfoCard
            title="Total PCs Currently Registered"
            value={totalPCRegistrations}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
