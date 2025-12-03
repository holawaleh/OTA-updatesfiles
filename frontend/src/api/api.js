import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================
// AUTH
// ======================
export function loginUser(data) {
  return api.post("/auth/login/", data);
}

// ======================
// DEVICES
// ======================
export function fetchDevices() {
  return api.get("/devices/");
}

export function fetchDevice(id) {
  return api.get(`/devices/${id}/`);
}

export function updateDevice(id, data) {
  return api.patch(`/devices/${id}/`, data);
}

export function deleteDevice(id) {
  return api.delete(`/devices/${id}/`);
}

// ======================
// PROJECTS
// ======================
export function fetchProjects() {
  return api.get("/projects/");
}

export function createProject(data) {
  return api.post("/projects/", data);
}

export function updateProject(id, data) {
  return api.patch(`/projects/${id}/`, data);
}

export function deleteProject(id) {
  return api.delete(`/projects/${id}/`);
}

// ======================
// FIRMWARE
// ======================
export function fetchFirmwares() {
  return api.get("/firmwares/");
}

export function uploadFirmware(data) {
  return api.post("/firmwares/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteFirmware(id) {
  return api.delete(`/firmwares/${id}/`);
}
