import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { fetchDevices } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();   // ✅ inside component

  useEffect(() => {
    loadDevices();
  }, []);

  async function loadDevices() {
    try {
      const res = await fetchDevices();
      setDevices(res.data);
    } catch (err) {
      console.error("Failed to load devices:", err);
    }
    setLoading(false);
  }

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Devices</h2>

      {loading && (
        <div className="text-gray-600 text-lg">Loading devices...</div>
      )}

      {!loading && devices.length === 0 && (
        <div className="text-gray-600 text-lg">No devices found.</div>
      )}

      {!loading && devices.length > 0 && (
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() => navigate(`/devices/${device.id}`)}
              className="cursor-pointer bg-white p-4 rounded shadow border hover:bg-gray-100 transition"
            >
              <div className="font-semibold text-lg">{device.mac_address}</div>
              <div className="text-sm text-gray-600">
                Version: {device.current_version}
              </div>
              <div className="text-sm text-gray-600">
                Status: {device.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
