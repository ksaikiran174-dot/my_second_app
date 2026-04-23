/**
 * API Service Module
 * Handles all API requests to the backend with error handling
 */

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

/**
 * Handle API responses and errors
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.detail || data.error || "An error occurred";
    throw new Error(errorMessage);
  }

  return data;
};

/**
 * Sign up a new user
 */
export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Get all tasks
 */
export const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (title, description) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
};

/**
 * Update a task
 */
export const updateTask = async (id, title, description, status) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, status }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Update task error:", error);
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Delete task error:", error);
    throw error;
  }
};
