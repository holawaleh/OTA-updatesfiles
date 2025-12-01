import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5 space-y-6">
        <h1 className="text-2xl font-bold">OTA Dashboard</h1>

        <nav className="space-y-3">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>

          <Link to="/devices" className="block p-2 rounded hover:bg-gray-700">
            Devices
          </Link>

          <Link to="/projects" className="block p-2 rounded hover:bg-gray-700">
            Projects
          </Link>

          <Link to="/firmware" className="block p-2 rounded hover:bg-gray-700">
            Firmware
          </Link>

          <Link to="/settings" className="block p-2 rounded hover:bg-gray-700">
            Settings
          </Link>

          <Link to="/" className="block p-2 rounded hover:bg-red-600 mt-10">
            Logout
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}
