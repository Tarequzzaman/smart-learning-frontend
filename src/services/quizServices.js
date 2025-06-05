
const API_URL = "http://209.38.90.132";


const staticQuizzes = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: "Canberra",
    hint: "It's a city planned specifically to be the capital.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
    hint: "It’s named after the Roman god of war.",
  },
  {
    id: 3,
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
    hint: "It's the language of the web!",
  },
  {
    id: 4,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperText Transmission Program",
      "None of the above",
    ],
    correctAnswer: "HyperText Transfer Protocol",
    hint: "It's the foundation of any data exchange on the Web.",
  },
  {
    id: 5,
    question: "Which company developed the React library?",
    options: ["Google", "Microsoft", "Facebook", "Twitter"],
    correctAnswer: "Facebook",
    hint: "It was developed to handle Facebook's dynamic UI.",
  },
];

export const getQuizzes = async (courseId, sectionIndex) => {
  try {
    const response = await fetch(
      `${API_URL}/section-quizzes?course_id=${courseId}&section_index=${sectionIndex}`,
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );

    if (!response.ok) throw new Error('API request failed');

    const apiQuizzes = await response.json();

    if (Array.isArray(apiQuizzes) && apiQuizzes.length > 0) {
      return apiQuizzes;
    }

    console.warn('⚠️ Empty quiz list from API, falling back to static quizzes');
    return staticQuizzes;

  } catch (error) {
    console.error('🔥 Error fetching quizzes from API:', error);
    return staticQuizzes;
  }
};


export const markQuizCompleted = async (courseId, sectionIndex) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.warn("🚫 No token found — cannot mark quiz completed");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/courses/${courseId}/sections/${sectionIndex}/quiz-complete`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "*/*",
        },
      }
    );

    if (!response.ok) {
      console.error("❌ Failed to mark quiz complete:", response.status);
    } else {
      console.log("✅ Quiz marked as complete");
    }
  } catch (err) {
    console.error("🔥 Error calling quiz-complete API:", err);
  }
};
