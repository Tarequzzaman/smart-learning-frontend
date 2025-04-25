import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const QuizPage = () => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answer, setAnswer] = useState("");
  const [quizStatus, setQuizStatus] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizFailed, setQuizFailed] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const questions = [
    {
      question: "Name a programming language that follows OOP",
      answer: "Java",
      options: ["Java", "HTML", "CSS", "JavaScript"],
    },
    {
      question: "Is HTML a backend language?",
      answer: "No",
      options: ["Yes", "No"],
    },
  ];

  // Function to handle submitting the answer
  const handleSubmit = () => {
    if (answer === questions[currentQuestion - 1].answer) {
      setQuizStatus("correct");
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setQuizStatus("incorrect");
    }

    setIsAnswered(true);
  };

  // Function to handle skipping the question
  const handleSkip = () => {
    setIsAnswered(true);
    setQuizStatus(null);
    setAnswer("");
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFailed(true);
      alert("Quiz Failed");
    }
  };

  // Function to handle moving to the next question
  const handleNext = () => {
    setIsAnswered(false);
    setAnswer("");
    setQuizStatus(null);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (correctAnswers === questions.length) {
        setQuizStatus("completed");
      } else {
        setQuizFailed(true);
      }
    }
  };

  // Function to handle navigating to the next page after quiz completion or failure
  const handleNextPage = () => {
    if (quizFailed) {
      setCorrectAnswers(0);
      setQuizFailed(false);
      setCurrentQuestion(1);
      setQuizStatus(null);
      setIsAnswered(false);
    } else {
      navigate("/learning-feed");
    }
  };

  const handleUserButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMyAccountClick = () => {
    navigate("/my-account");
  };

  const handleLogOutClick = () => {
    navigate("/signin");
  };

  const handleOngoingClick = () => {
    navigate("/course-details");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between w-full mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-2xl text-gray-700"
        >
          <span className="text-2xl">&lt;</span>
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">Quiz started</h1>
        <button
          onClick={handleUserButtonClick}
          className="text-2xl text-gray-700"
        >
          <FaUserCircle />
        </button>
        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div className="absolute right-0 mt-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="space-y-2 p-3">
              <li>
                <button
                  onClick={handleMyAccountClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={handleOngoingClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Ongoing
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogOutClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Quiz Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {quizStatus === "completed" ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
            <p className="text-lg mb-6">
              Congratulations! You have successfully completed the Quiz
            </p>
            <button
              onClick={handleNextPage}
              className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-green-600"
            >
              Next
            </button>
          </div>
        ) : quizFailed ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Failed</h2>
            <p className="text-lg mb-6">
              Sorry, you have not met the pass criteria! You can retry the quiz
              below
            </p>
            <div className="text-5xl text-blue-500 mb-4">😞</div>
            <button
              onClick={handleNextPage}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Introduction to programming
            </h2>
            <h3 className="text-xl mb-4">
              Question {currentQuestion} -{" "}
              {questions[currentQuestion - 1].question}
            </h3>

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer here"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex flex-wrap gap-4 mb-6">
              {questions[currentQuestion - 1].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(option)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback after answer */}
            {quizStatus === "incorrect" && (
              <div className="text-red-500 mb-4">
                <span>❌ Incorrect answer!</span>
                <p>
                  Hint: {questions[currentQuestion - 1].answer} is the correct
                  answer!
                </p>
              </div>
            )}
            {quizStatus === "correct" && (
              <div className="text-green-500 mb-4">
                <span>✔️ Correct answer!</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 mt-6">
              {!isAnswered ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleSkip}
                    className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-400"
                  >
                    Skip
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-md text-lg font-semibold hover:bg-green-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
