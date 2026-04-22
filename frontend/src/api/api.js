const BASE_URL = "https://my-second-app-ka05.onrender.com";

export const signupUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

export const createTask = async (title, description) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/tasks?title=${title}&description=${description}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateTask = async (id, title, description, status) => {
  const token = localStorage.getItem("token");

  // Updated to fix URL issue - hardcoded URL to ensure /tasks/ is included
  await fetch(
    `${BASE_URL}/tasks/${id}?title=${title}&description=${description}&status=${status}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};