// src/services/userService.js

// Mocked user data (replace with actual API later)
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com' },
  ];
  
  // Simulate fetching users
  export const getUsers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500); // Simulate delay
    });
  };


  // src/services/authService.js

const API_URL = "http://0.0.0.0:8004"; // Replace with actual URL in prod

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to register user");
    }

    return data;
  } catch (error) {
    throw error;
  }
};



export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/log_in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "Invalid credentials");

    return data; // contains access_token
  } catch (error) {
    throw error;
  }
};