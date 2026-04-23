import { useState } from "react";
import { createTask } from "../api/api";
import toast from "react-hot-toast";

export default function TaskForm({ loadTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Task title is required");
      toast.error("Task title is required");
      return;
    }

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      toast.error("Title must be at least 3 characters");
      return;
    }

    if (description.length > 1000) {
      setError("Description must be less than 1000 characters");
      toast.error("Description must be less than 1000 characters");
      return;
    }

    setLoading(true);
    try {
      await createTask(title, description);
      toast.success("Task created successfully ✅");
      
      setTitle("");
      setDescription("");
      setError("");
      loadTasks();
    } catch (error) {
      const errorMessage = error.message || "Failed to create task";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h2 className="form-title">➕ Create New Task</h2>
        
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              className="form-input"
              placeholder="Enter task title (minimum 3 characters)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              maxLength={200}
            />
            <small className="char-count">{title.length}/200</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Enter task description (optional, max 1000 characters)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              disabled={loading}
              maxLength={1000}
            />
            <small className="char-count">{description.length}/1000</small>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading || !title.trim()}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}