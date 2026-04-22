import { useState } from "react";
import { createTask } from "../api/api";
import toast from "react-hot-toast";

export default function TaskForm({ loadTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await createTask(title, description);
    toast.success("Task created ✅");
    
    setTitle("");
    setDescription("");
    loadTasks();
  };

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}