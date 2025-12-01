import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, fetchProjects, updateDevice } from "../api/api";

export default function DeviceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevice();
    loadProjects();
  }, []);

  async function fetchDevice() {
    try {
      const res = await api.get(`/devices/${id}/`);
      setDevice(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load device.");
    }
    setLoading(false);
  }

  async function loadProjects() {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAssignProject() {
    if (!selectedProject) {
      alert("Select a project first");
      return;
    }

    try {
      await updateDevice(id, { project: selectedProject });
      alert("Project assigned successfully!");
      fetchDevice(); // refresh device data
    } catch (err) {
      console.error(err);
      alert("Failed to assign project.");
    }
  }

  async function deleteDevice() {
    if (!window.confirm("Are you sure you want to delete this device?")) return;

    try {
      await api.delete(`/devices/${id}/`);
      alert("Device deleted.");
      navigate("/devices");
    } catch (err) {
      console.error(err);
      alert("Failed to delete device.");
    }
  }

  if (loading)
    return (
      <div className="p-6 text-gray-600 text-xl">
        Loading device details...
      </div>
    );

  if (error)
    return <div className="p-6 text-red-600 font-bold">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Device Details</h1>

      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <p className="text-xl font-semibold">{device.mac_address}</p>

        <div className="mt-3">
          <p><strong>Version:</strong> {device.current_version}</p>
          <p><strong>Status:</strong> {device.status}</p>
          <p><strong>Project:</strong> {device.project || "None"}</p>
          <p><strong>Update Counter:</strong> {device.update_counter}</p>
          <p><strong>Last Seen:</strong> {device.last_seen_update_counter}</p>
          <p className="text-gray-500 mt-2">
            <strong>API Key:</strong> {device.api_key}
          </p>
        </div>

        <button
          onClick={deleteDevice}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete Device
        </button>
      </div>

      {/* Assign Project Section */}
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Assign to Project</h3>

        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a project</option>

          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssignProject}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Assign Project
        </button>
      </div>

      <button
        onClick={() => navigate("/devices")}
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
      >
        Back to Devices
      </button>
    </div>
  );
}
