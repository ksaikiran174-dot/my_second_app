const BASE_URL = "https://my-second-app-ka05.onrender.com";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login?email=${email}&password=${password}`, {
    method: "POST"
  });
  return res.json();
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

  await fetch(`https://my-second-app-ka05.onrender.com/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateTask = async (id, title, description, status) => {
  const token = localStorage.getItem("token");

  await fetch(
    `https://my-second-app-ka05.onrender.com/${id}?title=${title}&description=${description}&status=${status}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};