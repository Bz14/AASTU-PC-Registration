import React, { useEffect, useState } from 'react';
import BarChart from '../Components/Dashboard/BarChart';
import PieChart from '../Components/Dashboard/PieChart';
import InfoCard from '../Components/Dashboard/InfoCard';
import axios from 'axios';

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [pcs, setPcs] = useState([]);

  // Initialize chart data
  const [barData1, setBarData1] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{ label: 'Total Admin Registrations', data: new Array(12).fill(0), backgroundColor: '#e2ad00e1' }],
  });

  const [barData2, setBarData2] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{ label: 'Total PC Registrations of the Year', data: new Array(12).fill(0), backgroundColor: '#22C55E' }],
  });

  const [pieData1, setPieData1] = useState({
    labels: ['Females', 'Males'],
    datasets: [{ data: [0, 0], backgroundColor: ['#6366F1', '#FBBF24'] }],
  });

  const [pieData2, setPieData2] = useState({
    labels: ['In', 'Out'],
    datasets: [{ data: [0, 0], backgroundColor: ['#F87171', '#34D399'] }],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const adminResponse = await axios.get('http://127.0.0.1:8000/api/admins');
        setAdmins(adminResponse.data);

        const pcResponse = await axios.get('http://127.0.0.1:8000/api/pcs');
        setPcs(pcResponse.data);

        // Process admin registrations
        const adminBarData = { ...barData1 }; // Copy initial bar data
        adminResponse.data.forEach(admin => {
          const month = new Date(admin.created_at).getMonth();
          adminBarData.datasets[0].data[month] += 1;
        });
        setBarData1(adminBarData); // Update state with processed data

        // Process PC registrations
        const pcBarData = { ...barData2 }; // Copy initial bar data
        pcResponse.data.forEach(pc => {
          const month = new Date(pc.created_at).getMonth();
          pcBarData.datasets[0].data[month] += 1;
        });
        setBarData2(pcBarData); // Update state with processed data

        // Update pie data
        const updatedPieData1 = { ...pieData1 };
        updatedPieData1.datasets[0].data[0] = admins.filter(admin => admin.gender === 'Female').length;
        updatedPieData1.datasets[0].data[1] = admins.filter(admin => admin.gender === 'Male').length;
        setPieData1(updatedPieData1); // Update state with processed pie data

        const updatedPieData2 = { ...pieData2 };
        updatedPieData2.datasets[0].data[0] = pcs.filter(pc => pc.status === 'In').length;
        updatedPieData2.datasets[0].data[1] = pcs.filter(pc => pc.status === 'Out').length;
        setPieData2(updatedPieData2); // Update state with processed pie data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

  const totalAdminRegistrations = admins.length;
  const totalPCRegistrations = pcs.length;
  const recentPCRegistrations = pcs.filter(pc => new Date(pc.created_at).getMonth() === new Date().getMonth()).length;

  return (
    <div className="p-4 w-full h-full navbar">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 custom:grid-cols-[55%,45%] gap-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 rounded-md shadow-md" style={{border: `solid var(--text-color) 2px`,}}>
            <h2 className="text-lg font-semibold mb-2">Admin Registrations Over the Year</h2>
            <BarChart data={barData1} />
          </div>
          <div className="p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">PC Registrations Over the Year</h2>
            <BarChart data={barData2} />
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">Admin Gender Distribution</h2>
              <PieChart data={pieData1} />
            </div>
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">PC In/Out Status</h2>
              <PieChart data={pieData2} />
            </div>
          </div> */}
        </div>

        <div className="p-4 rounded-md shadow-md flex flex-col gap-2 " style={{ border: 'solid var(--text-color) 2px' }}>
          <InfoCard title="Total Admin Registrations" value={totalAdminRegistrations} />
          <InfoCard title="Total PC Registrations This Month" value={recentPCRegistrations} />
          <InfoCard title="Total PCs Currently Registered" value={totalPCRegistrations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
