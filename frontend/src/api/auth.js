import axios from "axios";

// Use the environment VITE_API_URL (set in `.env`) so hosted backends are used in production.
// Fallback to localhost for local development when VITE_API_URL is not set.
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, {
      username,
      password,
    });

    return response.data; // contains access + refresh
  } 
  catch (err) {
    throw err.response?.data || { detail: "Network error" };
  }
}

export function saveTokens(tokens) {
  localStorage.setItem("access", tokens.access);
  localStorage.setItem("refresh", tokens.refresh);
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

