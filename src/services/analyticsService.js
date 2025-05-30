// src/services/analyticsService.js

const API_URL = "http://Localhost:8004";

export const getAnalyticsData = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Access token not found ");
  }

  try {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to fetch analytics data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};
