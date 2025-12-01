import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

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

