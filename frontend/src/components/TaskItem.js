import { deleteTask, updateTask } from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskItem({ task, loadTasks }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return "✅";
      case "in progress":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "•";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "status-done";
      case "in progress":
        return "status-inprogress";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    setLoading(true);
    try {
      await deleteTask(task.id);
      toast.success("Task deleted successfully 🗑️");
      loadTasks();
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    setLoading(true);
    try {
      await updateTask(task.id, title, description, status);
      setEditing(false);
      toast.success("Task updated successfully ✏️");
      loadTasks();
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="task-card editing">
        <div className="edit-mode">
          <div className="form-group">
            <label>Task Title</label>
            <input
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="pending">⏳ Pending</option>
              <option value="in progress">🔄 In Progress</option>
              <option value="done">✅ Done</option>
            </select>
          </div>

          <div className="edit-actions">
            <button
              className="btn-save"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${getStatusColor(task.status)}`}>
      <div className="task-header">
        <div className="task-status-badge">
          <span className={`status-badge ${getStatusColor(task.status)}`}>
            {getStatusIcon(task.status)} {task.status}
          </span>
        </div>
        <div className="task-id">ID: {task.id}</div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        <p className="task-description">{description || "No description provided"}</p>
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => setEditing(true)}
          disabled={loading}
          title="Edit task"
        >
          ✏️ Edit
        </button>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={loading}
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}