import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { fetchProjects, createProject, deleteProject } from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleCreateProject(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Project name required");

    try {
      await createProject({ name, description });
      setName("");
      setDescription("");
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  }

  async function handleDeleteProject(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {/* NEW PROJECT FORM */}
      <form
        onSubmit={handleCreateProject}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Create New Project</h2>

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Create Project
        </button>
      </form>

      {/* PROJECT LIST */}
      {loading ? (
        <div>Loading projects…</div>
      ) : projects.length === 0 ? (
        <div>No projects available.</div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded shadow border flex justify-between"
            >
              <div>
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-gray-700 text-sm">{p.description}</div>
              </div>

              <button
                onClick={() => handleDeleteProject(p.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
