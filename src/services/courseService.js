const API_URL = "https://api.smartlearningchampanion.com";

export const getRecommendedCourses = async () => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  const response = await fetch(
    `${API_URL}/recommendations?user_id=${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch recommended courses");
  }

  const data = await response.json();

  // Map API response to frontend-friendly format
  return data.map((course) => ({
    id: course.id,
    title: course.course_title,
    description: course.course_description,
    duration: 40, // placeholder, or get from API if available
    difficulty: course.course_level,
  }));
};

export const fetchCourseById = async (courseId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  const response = await fetch(`${API_URL}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch course");
  }

  const data = await response.json();
  return data; // This should match your expected courseData structure
};

export const getMyCourses = async () => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  if (!user || !user.id) {
    throw new Error("User info not found.");
  }

  const response = await fetch(`${API_URL}/mycourses?user_id=${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch my courses");
  }

  const data = await response.json();

  return data.map((course) => ({
    id: course.id,
    title: course.course_title,
    description: course.course_description,
    progress: course.course_progress || 0,
    duration: 40, // placeholder, or get from API if available
    difficulty: course.course_level,
  }));
};

export const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  if (!user || !user.id) {
    throw new Error("User info not found.");
  }

  const response = await fetch(`${API_URL}/enroll`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      course_id: courseId,
      user_id: user.id,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to enroll in course");
  }

  return await response.json();
};

export const getCoursesByTopicId = async (topicId) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  const response = await fetch(`${API_URL}/topics/${topicId}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch courses for topic");
  }

  const data = await response.json();

  return {
    topic: {
      id: data.topic.id,
      title: data.topic.title,
      description: data.topic.description,
    },
    courses: data.courses.map((course) => ({
      id: course.id,
      title: course.course_title,
      description: course.course_description,
      duration: 40, // placeholder or pull from API if available
      difficulty: course.course_level,
    })),
  };
};

export const updateCourseProgress = async (courseId, progress) => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  if (!user || !user.id) {
    throw new Error("User info not found.");
  }

  const response = await fetch(`${API_URL}/courses/update_progress`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      course_id: courseId,
      user_id: user.id,
      progress: progress,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update course progress");
  }

  return await response.json();
};

export const getCompletedCourses = async () => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    throw new Error("Access token not found. Please log in.");
  }

  if (!user || !user.id) {
    throw new Error("User info not found.");
  }

  const response = await fetch(
    `${API_URL}/users/${user.id}/completed-courses`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch completed courses");
  }

  const data = await response.json();
  console.log(data);

  return data.map((course) => ({
    id: course.id,
    title: course.course_title,
    description: course.course_description,
    difficulty: course.course_level,
  }));
};
