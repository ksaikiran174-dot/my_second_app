import { useEffect, useState } from "react";
import { getTasks } from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
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

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="dashboard" style={{ backgroundColor: 'green' }}>
      <h1>Task Manager</h1>

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