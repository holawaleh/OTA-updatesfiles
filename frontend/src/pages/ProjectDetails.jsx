import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../layout/DashboardLayout";
import { fetchFirmwares, updateProject, deleteProject } from "../api/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [devices, setDevices] = useState([]);
  const [firmwares, setFirmwares] = useState([]);
  const [selectedFirmware, setSelectedFirmware] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
    loadFirmwares();
  }, []);

  async function loadProject() {
    try {
      const res = await api.get(`/projects/${id}/`);
      setProject(res.data);
      loadDevicesForProject(res.data.devices);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
    setLoading(false);
  }

  async function loadDevicesForProject(deviceIds) {
    const results = [];
    for (const devId of deviceIds) {
      try {
        const res = await api.get(`/devices/${devId}/`);
        results.push(res.data);
      } catch (e) {
        console.error("Device missing:", devId);
      }
    }
    setDevices(results);
  }

  async function loadFirmwares() {
    try {
      const res = await fetchFirmwares();
      setFirmwares(res.data);
    } catch (err) {
      console.error("Failed to load firmwares:", err);
    }
  }

  async function handleAssignFirmware() {
    if (!selectedFirmware) {
      alert("Select a firmware first.");
      return;
    }

    try {
      await updateProject(id, { firmware: selectedFirmware });
      alert("Firmware assigned!");
      loadProject();
    } catch (err) {
      console.error(err);
      alert("Failed to assign firmware.");
    }
  }

  async function handleDeleteProject() {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await deleteProject(id);
      alert("Project deleted.");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  }

  if (loading) {
    return <DashboardLayout>Loading project...</DashboardLayout>;
  }

  if (!project) {
    return <DashboardLayout>Project not found.</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>

      {/* Firmware assignment section */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">Assigned Firmware</h3>

        <p className="text-gray-600 mb-4">
          Current firmware:{" "}
          {project.firmware ? `#${project.firmware}` : "None assigned"}
        </p>

        <select
          value={selectedFirmware}
          onChange={(e) => setSelectedFirmware(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select firmware</option>
          {firmwares.map((fw) => (
            <option key={fw.id} value={fw.id}>
              {fw.version} — {fw.project}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssignFirmware}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Assign Firmware
        </button>
      </div>

      {/* Devices list */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-xl font-semibold mb-4">Devices in this Project</h3>

        {devices.length === 0 && (
          <p className="text-gray-500">No devices assigned.</p>
        )}

        <div className="space-y-3">
          {devices.map((dev) => (
            <div
              key={dev.id}
              onClick={() => navigate(`/devices/${dev.id}`)}
              className="p-4 shadow rounded border cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="font-semibold">{dev.mac_address}</div>
              <div className="text-sm text-gray-600">
                Version: {dev.current_version}
              </div>
              <div className="text-sm text-gray-600">Status: {dev.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete project */}
      <button
        onClick={handleDeleteProject}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Project
      </button>
    </DashboardLayout>
  );
}
