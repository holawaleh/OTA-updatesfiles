import Firmware from "./pages/Firmware.jsx";
import Settings from "./pages/Settings.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Devices from "./pages/Devices.jsx";
import Projects from "./pages/Projects.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/firmware" element={<Firmware />} />
<Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}
