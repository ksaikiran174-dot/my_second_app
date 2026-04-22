import { useEffect, useState } from "react";
import { getTasks, logoutUser } from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status === "pending").length;

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      filter === "all" ? true : task.status === filter
    );

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    loadTasks();
  }, []);

  return (
    <div className="dashboard" style={{ backgroundColor: 'green' }}>
      <div className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          {user && <p className="user-info">Welcome, {user.name}!</p>}
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="top_bar">
        <div className="stats">
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
          <p>Pending: {pending}</p>
        </div>

        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter_buttons">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("done")}>Done</button>
        </div>
      </div>

      <TaskForm loadTasks={loadTasks} />

      <div className="tasks_grid">
        <h2>My Tasks</h2>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} loadTasks={loadTasks} />
        ))}
      </div>
    </div>
  );
}