import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getQuizzes } from '../../services/quizServices';

const Quiz = () => {
  /* ───────── incoming state ───────── */
  const location   = useLocation();
  const navigate   = useNavigate();
  const { courseId, sectionIndex } = location.state || {};

  /* guard against direct visit */
  useEffect(() => {
    if (!courseId && !sectionIndex && process.env.NODE_ENV !== 'development') {
      navigate('/dashboard'); // fallback
    }
  }, []);

  /* ───────── local state ───────── */
  const [quizzes, setQuizzes]                 = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption]     = useState('');
  const [showResult, setShowResult]             = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showPopup, setShowPopup]               = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect]   = useState(false);

  /* ───────── load quizzes for this course section ───────── */
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes(courseId, sectionIndex); // API signature: (course, section)
        setQuizzes(data);
      } catch (err) {
        console.error('Failed to load quizzes', err);
      }
    };
    if (courseId !== undefined && sectionIndex !== undefined) fetchQuizzes();
  }, [courseId, sectionIndex]);

  /* ───────── helpers ───────── */
  const currentQuiz = quizzes[currentQuizIndex];

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswerCorrect(selectedOption === currentQuiz.correctAnswer);
    if (selectedOption === currentQuiz.correctAnswer) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setShowPopup(true);
  };

  const handleNextQuestion = () => {
    setShowPopup(false);
    setSelectedOption('');
    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  /* ───────── final screen ───────── */
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading quizzes...
      </div>
    );
  }

  if (showResult) {
    const quizPassed = correctAnswersCount === quizzes.length;
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
        <h1
          className={`text-4xl font-bold mb-4 ${
            quizPassed ? 'text-indigo-700' : 'text-red-500'
          }`}
        >
          {quizPassed ? '🎉 Congratulations!' : '😢 Try Again!'}
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          {quizPassed
            ? 'You answered every question correctly!'
            : 'You missed some questions.'}
        </p>

        {quizPassed ? (
          <button
            className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition"
            onClick={() =>
              navigate('/dashboard/detail-courses', {
                state: { courseId, completedSection: sectionIndex }, // ◀ tell CourseDetail the quiz is done
              })
            }
          >
            Back to Course
          </button>
        ) : (
          <>
            <button
              className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition mb-4"
              onClick={() => window.location.reload()}
            >
              Retry Quiz
            </button>
            <button
              className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full font-medium hover:bg-gray-400 transition"
              onClick={() =>
                navigate('/dashboard/detail-courses', {
                  state: { courseId }, 
                })
              }
            >
              Back to Course
            </button>
          </>
        )}
      </main>
    );
  }

  /* ───────── question view ───────── */
  return (
    <main className="bg-white min-h-screen flex flex-col items-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center">
          Quiz {currentQuizIndex + 1} of {quizzes.length}
        </h2>

        <div className="rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuiz.question}
          </h3>

          <div className="flex flex-col space-y-4">
            {currentQuiz.options.map(option => (
              <label
                key={option}
                className={`cursor-pointer py-2 px-4 rounded-lg border ${
                  selectedOption === option
                    ? 'bg-indigo-600 text-white'
                    : 'bg-transparent text-gray-800 border-indigo-200'
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
              onClick={() => {
                /* optional skip logic */
                setSelectedOption('');
                handleNextQuestion();
              }}
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

      {/* feedback popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-10 max-w-md w-full text-center shadow-lg">
            <div className="text-6xl mb-4">{isAnswerCorrect ? '🎉' : '😢'}</div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
            </h2>
            {!isAnswerCorrect && currentQuiz.hint && (
              <p className="text-md text-gray-700 mb-6">Hint: {currentQuiz.hint}</p>
            )}
            <button
              className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition"
              onClick={handleNextQuestion}
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
