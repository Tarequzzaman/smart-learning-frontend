const API_URL = "http://127.0.0.1:8004"; // Same as you already have

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