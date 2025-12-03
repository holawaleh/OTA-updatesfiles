import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export default api;


export function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };
}

export async function fetchDevices() {
  return api.get("/devices/", authHeaders());
}

export async function fetchProjects() {
  return api.get("/projects/", authHeaders());
}

export async function updateDevice(deviceId, payload) {
  return api.put(`/devices/${deviceId}/`, payload, authHeaders());
}


export function createProject(data) {
  return api.post("/projects/", data);
}

export function deleteProject(id) {
  return api.delete(`/projects/${id}/`);
}

export function updateProject(id, data) {
  return api.put(`/projects/${id}/`, data);
}

export function fetchFirmwares() {
  return api.get("/firmwares/");
}

export function updateProject(id, data) {
  return api.put(`/projects/${id}/`, data);
}

export function deleteProject(id) {
  return api.delete(`/projects/${id}/`);
}
