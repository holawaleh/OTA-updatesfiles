import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

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


