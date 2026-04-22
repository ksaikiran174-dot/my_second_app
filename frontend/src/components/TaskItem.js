import { deleteTask, updateTask } from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskItem({ task, loadTasks }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleDelete = async () => {
    const confirm = window.confirm("Delete this task?");
    if (!confirm) return;

    await deleteTask(task.id);
    toast.success("Task deleted 🗑️");
    loadTasks();
  };

  const handleUpdate = async () => {
    await updateTask(task.id, title, description, status);
    setEditing(false);
    toast.success("Task updated ✏️");
    loadTasks();
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}