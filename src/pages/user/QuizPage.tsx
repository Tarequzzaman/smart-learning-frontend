import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../../services/quizServices";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const handleSubmit = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedOption === currentQuiz.correctAnswer) {
      setIsAnswerCorrect(true);
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      setIsAnswerCorrect(false);
    }
    setShowPopup(true);
  };

  const handleNext = () => {
    setShowPopup(false);
    setSelectedOption("");
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleSkip = () => {
    setSelectedOption("");
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading quizzes...
      </div>
    );
  }

  if (showResult) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
        {correctAnswersCount === quizzes.length ? (
          <>
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">
              🎉 Congratulations!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              You answered all questions correctly and completed the course!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-red-500 mb-4">
              😢 Try Again!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              You missed some questions. Would you like to retry?
            </p>
          </>
        )}
        <button
          className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition mb-4"
          onClick={() => window.location.reload()}
        >
          Retry Quiz
        </button>
        <button
          className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full font-medium hover:bg-gray-400 transition"
          onClick={() => navigate("/explore")}
        >
          Back to Explore
        </button>
      </main>
    );
  }

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <main className="bg-white min-h-screen flex flex-col items-center px-6 py-16">
      {/* Quiz Content */}
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center">
          Quiz {currentQuizIndex + 1} of {quizzes.length}
        </h2>

        {/* Quiz Card (Transparent) */}
        <div className="rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuiz.question}
          </h3>
          <div className="flex flex-col space-y-4">
            {currentQuiz.options.map((option, index) => (
              <label
                key={index}
                className={`cursor-pointer py-2 px-4 rounded-lg border ${
                  selectedOption === option
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-800 border-indigo-200"
                } hover:bg-indigo-100 transition`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full font-medium hover:bg-gray-400 transition"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Custom Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-10 max-w-md w-full text-center shadow-lg">
            <div className="text-6xl mb-4">{isAnswerCorrect ? "🎉" : "😢"}</div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              {isAnswerCorrect ? "Correct!" : "Incorrect!"}
            </h2>
            {!isAnswerCorrect && (
              <p className="text-md text-gray-700 mb-6">
                Hint: {currentQuiz.hint}
              </p>
            )}
            <button
              className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Quiz;
