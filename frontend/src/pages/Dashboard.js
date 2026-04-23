import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const inProgress = total - completed - pending;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const loadTasks = async () => {
    setLoading(false);
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadTasks();
  }, []);

  return (
    <div className="page-container">
      <Navbar user={user} />
      
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Analytics Dashboard</h1>
          <p className="dashboard-subtitle">Track your task progress</p>
        </div>

        {loading ? (
          <div className="loading">Loading analytics...</div>
        ) : (
          <div className="analytics-container">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <p className="stat-label">Total Tasks</p>
                  <h2 className="stat-value">{total}</h2>
                </div>
              </div>

              <div className="stat-card completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <p className="stat-label">Completed</p>
                  <h2 className="stat-value">{completed}</h2>
                </div>
              </div>

              <div className="stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <p className="stat-label">Pending</p>
                  <h2 className="stat-value">{pending}</h2>
                </div>
              </div>

              <div className="stat-card inprogress">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <p className="stat-label">In Progress</p>
                  <h2 className="stat-value">{inProgress}</h2>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="progress-section">
              <h2>Completion Rate</h2>
              <div className="progress-container">
                <div className="progress-bar-wrapper">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill completed-fill"
                      style={{ width: `${total === 0 ? 0 : Math.round((completed / total) * 100)}%` }}
                    ></div>
                    <div 
                      className="progress-fill inprogress-fill"
                      style={{ width: `${total === 0 ? 0 : Math.round((inProgress / total) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">{completionRate}% Complete</p>
                </div>

                <div className="progress-details">
                  <div className="progress-item">
                    <div className="progress-dot completed"></div>
                    <span>{completed} completed</span>
                  </div>
                  <div className="progress-item">
                    <div className="progress-dot inprogress"></div>
                    <span>{inProgress} in progress</span>
                  </div>
                  <div className="progress-item">
                    <div className="progress-dot pending"></div>
                    <span>{pending} pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="summary-section">
              <h2>Quick Summary</h2>
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>Tasks Today</h3>
                  <p className="summary-value">{total}</p>
                  <p className="summary-desc">tasks in your list</p>
                </div>
                <div className="summary-card">
                  <h3>Productivity</h3>
                  <p className="summary-value">{completionRate}%</p>
                  <p className="summary-desc">completion rate</p>
                </div>
                <div className="summary-card">
                  <h3>Remaining</h3>
                  <p className="summary-value">{pending + inProgress}</p>
                  <p className="summary-desc">tasks to complete</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}