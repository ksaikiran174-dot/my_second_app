import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../api/api";
import toast from "react-hot-toast";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>📋 TaskFlow</h1>
        </div>

        <div className="navbar-links">
          <a 
            href="/dashboard" 
            className={`nav-link ${isActive("/dashboard")}`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            📊 Dashboard
          </a>
          <a 
            href="/tasks" 
            className={`nav-link ${isActive("/tasks")}`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/tasks");
            }}
          >
            ✓ My Tasks
          </a>
        </div>

        <div className="navbar-right">
          {user && <span className="user-name">👤 {user.name}</span>}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
