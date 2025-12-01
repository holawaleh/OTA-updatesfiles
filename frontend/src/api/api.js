import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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


