const API_URL = "http://127.0.0.1:8004";

export const getTopics = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/topics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch topics");
  }

  const data = await response.json();

  return data.map((topic) => {
    const totalCourses = topic.courses?.length || 0;
    const aiGeneratedCount = topic.courses
      ? topic.courses.filter((course) => course.is_detail_created_by_ai).length
      : 0;

    return {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      createdBy: `${topic.creator.first_name} ${topic.creator.last_name}`,
      createdAt: topic.created_at,
      totalCourses,
      aiGeneratedCount,
      courses: topic.courses || [],  // ✅ Include the courses array here
    };
  });
};


export const createTopic = async (topicData) => {
  const token = localStorage.getItem("access_token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    throw new Error("Missing user or token. Please log in again.");
  }

  const user = JSON.parse(userString);

  const response = await fetch(`${API_URL}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(topicData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create topic");
  }

  const created = await response.json();

  console.log({
    id: created.id,
    title: created.title,
    description: created.description,
    createdBy: `${user.first_name} ${user.last_name}`,
    createdAt: new Date().toISOString().split("T")[0],
  });

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    createdBy: `${user.first_name} ${user.last_name}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
};

export const updateTopic = async (id, topicData) => {
  const token = localStorage.getItem("access_token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    throw new Error("Missing user or token. Please log in again.");
  }

  const user = JSON.parse(userString);

  const response = await fetch(`${API_URL}/topics/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(topicData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update topic");
  }

  const updated = await response.json();

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    createdBy: `${updated.creator.first_name} ${updated.creator.last_name}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
};

export const deleteTopic = async (id) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  const response = await fetch(`${API_URL}/topics/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to delete topic");
  }
};

export const hasUserGivenInterests = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/users/interests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to check user interests");
    }

    const data = await response.json();
    console.log(data.hasInterests);
    return data.hasInterests;
  } catch (error) {
    console.error("Error checking user interests:", error);
    return false;
  }
};

export const submitUserInterest = async (selectedTopics) => {
  console.log("Selected topics:", selectedTopics);
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  try {
    const response = await fetch(`${API_URL}/users/topic-preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topic_ids: selectedTopics }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit selected topics.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting topics:", error);
    throw new Error("An error occurred while submitting your selected topics.");
  }
};
