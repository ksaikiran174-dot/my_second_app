import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      filter === "all" ? true : task.status === filter
    );

  const loadTasks = async () => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
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
      
      <div className="tasks-page">
        <div className="tasks-header">
          <h1>My Tasks</h1>
          <p className="task-count">Total: {filteredTasks.length} tasks</p>
        </div>

        <div className="tasks-controls">
          <input
            className="search-input"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Tasks
            </button>
            <button 
              className={`filter-btn ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              ⏳ Pending
            </button>
            <button 
              className={`filter-btn ${filter === "done" ? "active" : ""}`}
              onClick={() => setFilter("done")}
            >
              ✅ Completed
            </button>
          </div>
        </div>

        <TaskForm loadTasks={loadTasks} />

        <div className="tasks-content">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks found</p>
              <p className="text-muted">Create a new task to get started!</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} loadTasks={loadTasks} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
