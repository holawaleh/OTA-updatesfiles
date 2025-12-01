import { useState } from "react";
import { loginUser, saveTokens } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const tokens = await loginUser(username, password);
      saveTokens(tokens);
      navigate("/dashboard");
    } 
    catch (err) {
      setError(err.detail || "Login failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
}
