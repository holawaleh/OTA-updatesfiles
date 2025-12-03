import axios from "axios";
import {
  fetchProject,
  fetchDevice,
  fetchFirmwares,
  updateProject,
  deleteProject
} from "../api/api";

// ----------------------------
// BASE CONFIG
// ----------------------------
const BASE_URL = "https://ota-bakfiles.onrender.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------------
// AUTH
// ----------------------------
export async function loginUser(username, password) {
  return api.post("/auth/login/", { username, password });
}

// ----------------------------
// DEVICES
// ----------------------------
export function fetchDevices() {
  return api.get("/devices/");
}

export function fetchDevice(id) {
  return api.get(`/devices/${id}/`);
}

export function createDevice(data) {
  return api.post("/devices/", data);
}

export function updateDevice(id, data) {
  return api.put(`/devices/${id}/`, data);
}

export function deleteDevice(id) {
  return api.delete(`/devices/${id}/`);
}

// ----------------------------
// PROJECTS
// ----------------------------
export function fetchProjects() {
  return api.get("/projects/");
}

export function fetchProject(id) {
  return api.get(`/projects/${id}/`);
}

export function createProject(data) {
  return api.post("/projects/", data);
}

export function updateProject(id, data) {
  return api.put(`/projects/${id}/`, data);
}

export function deleteProject(id) {
  return api.delete(`/projects/${id}/`);
}

// ----------------------------
// FIRMWARE
// ----------------------------
export function fetchFirmwares() {
  return api.get("/firmwares/");
}

export function fetchFirmware(id) {
  return api.get(`/firmwares/${id}/`);
}

export function uploadFirmware(data) {
  return api.post("/firmwares/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteFirmware(id) {
  return api.delete(`/firmwares/${id}/`);
}


async function loadProject() {
  try {
    const res = await fetchProject(id);
    setProject(res.data);
    loadDevicesForProject(res.data.devices);
  } catch (err) {
    console.error("Failed to load project:", err);
  }
  setLoading(false);
}

