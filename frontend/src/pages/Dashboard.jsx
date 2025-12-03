import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { fetchDevices, fetchProjects, fetchFirmwares } from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    devices: 0,
    online: 0,
    offline: 0,
    projects: 0,
    firmwares: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const devRes = await fetchDevices();
      const projRes = await fetchProjects();
      const firmRes = await fetchFirmwares();

      const devices = devRes.data;
      const onlineCount = devices.filter((d) => d.status === "ONLINE").length;

      setStats({
        devices: devices.length,
        online: onlineCount,
        offline: devices.length - onlineCount,
        projects: projRes.data.length,
        firmwares: firmRes.data.length,
      });
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
    setLoading(false);
  }

  if (loading)
    return (
      <DashboardLayout>
        <h2 className="text-xl text-gray-600">Loading Dashboard...</h2>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Total Devices</h3>
          <p className="text-4xl font-bold mt-2">{stats.devices}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Online</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.online}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Offline</h3>
          <p className="text-4xl font-bold text-red-600 mt-2">{stats.offline}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Projects</h3>
          <p className="text-4xl font-bold mt-2">{stats.projects}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Firmware Files</h3>
          <p className="text-4xl font-bold mt-2">{stats.firmwares}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
