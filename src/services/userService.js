const API_URL = "http://127.0.0.1:8004";

export const getUsers = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch users");
  }

  const data = await response.json();

  // Map API response to frontend-friendly format
  return data.map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
  }));
};

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

    console.log(email);
    console.log(password);

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "Invalid credentials");

    return data; // contains access_token
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found.");
  }

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name: updatedData.firstName,
      last_name: updatedData.lastName,
      role: updatedData.role.toLowerCase(),
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to update user");
  }

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    role: data.role,
    isActive: data.is_active,
  };
};

export const deleteUser = async (userId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token missing.");
  }

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to delete user");
  }

  return true;
};

export const getUserSelectedTopics = async () => {
  const authToken = localStorage.getItem("access_token");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
    throw new Error("User ID not found in localStorage.");
  }
  const userId = user.id;

  try {
    const response = await fetch(`${API_URL}/users/${userId}/selected-topics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to fetch selected topics.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendRegisterPasswordCode = async (email) => {
  try {
    const response = await fetch(`${API_URL}/register/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to send reset code.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyRegisterPasswordCode = async (email, code) => {
  try {
    const response = await fetch(`${API_URL}/register/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to verify code.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
