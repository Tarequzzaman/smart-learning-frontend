const API_URL = "https://api.smartlearningchampanion.com";

export const sendResetPasswordCode = async (email) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password/send-code`, {
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

    return data; // { message: "Reset code sent to your email address." }
  } catch (error) {
    throw error;
  }
};

export const verifyResetPasswordCode = async (email, code) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password/verify-code`, {
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

    return data; // { message: "Reset code verified successfully." }
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to reset password.");
    }

    return data; // { message: "Password reset successfully." }
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async (userData, authToken) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log(userData);
  try {
    const response = await fetch(`${API_URL}/users/update/${storedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to update user details.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
