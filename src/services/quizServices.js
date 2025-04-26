// src/services/quizService.js

const quizzes = [
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

export const getQuizzes = async () => {
  return quizzes;
};
