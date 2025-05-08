import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTopics,
  hasUserGivenInterests,
  submitUserInterest,
} from "../../services/topicService";
import {
  getRecommendedCourses,
  getMyCourses,
  enrollInCourse,
} from "../../services/courseService";

const DashboardHome = () => {
  const navigate = useNavigate();
  const myCoursesRef = useRef(null);
  const recommendedCoursesRef = useRef(null);

  const [showInterestModal, setShowInterestModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkUserInterest = async () => {
      const interested = await hasUserGivenInterests();
      if (!interested) {
        const topicsFetched = await getTopics();
        setTopics(topicsFetched);
        setShowInterestModal(true);
      }
    };

    checkUserInterest();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const recommended = await getRecommendedCourses();
        setRecommendedCourses(recommended);

        const myEnrolledCourses = await getMyCourses();
        setMyCourses(myEnrolledCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const cardWidth = 300 + 24;
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const toggleTopicSelection = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(selectedTopics.filter((id) => id !== topicId));
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const handleSubmitInterest = async () => {
    if (selectedTopics.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await submitUserInterest(selectedTopics);
      setShowInterestModal(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    console.log("User skipped selecting topics.");
    setShowInterestModal(false);
  };

  const handleEnrollAndNavigate = async (course) => {
    try {
      await enrollInCourse(course.id);

      const myEnrolledCourses = await getMyCourses();
      setMyCourses(myEnrolledCourses);

      navigate("/dashboard/detail-courses", {
        state: { courseId: course.id },
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* === Interest Modal === */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
              Select Your Interests
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Choose topics you're interested in:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopicSelection(topic.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedTopics.includes(topic.id)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:shadow transition`}
                >
                  {topic.title}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleSkip}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Skip for now
              </button>
              <button
                onClick={handleSubmitInterest}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Interest"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Header Section === */}
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Your Personalized Learning Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Track your progress, explore new topics, and continue your learning
          journey with AI-curated content designed just for you.
        </p>
      </section>

      {/* === My Learning Section === */}
      <section className="relative max-w-7xl mx-auto mb-16 group">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Learning</h2>

        {myCourses.length === 0 ? (
          <p className="text-gray-500 text-center mb-8">
            You have not enrolled in any courses yet.
          </p>
        ) : (
          <div
            ref={myCoursesRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4 scroll-smooth snap-x snap-mandatory"
          >
            {myCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showProgress
                onClick={() =>
                  navigate("/dashboard/detail-courses", {
                    state: { courseId: course.id },
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* === Recommended for You Section === */}
      <section className="relative max-w-7xl mx-auto mb-20 group">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Recommended for You
        </h2>

        {recommendedCourses.length === 0 ? (
          <p className="text-gray-500 text-center mb-8">
            No recommended courses available at the moment.
          </p>
        ) : (
          <div
            ref={recommendedCoursesRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4 scroll-smooth snap-x snap-mandatory"
          >
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleEnrollAndNavigate(course)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

const CourseCard = ({ course, showProgress, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex-shrink-0 w-[300px] h-[340px] bg-white hover:bg-gray-50 transition-all transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between snap-start"
    >
      <div>
        <div className="mb-2">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
            📚 Course
          </span>
        </div>
        <h3 className="text-md font-bold text-gray-800 mb-2 truncate">
          {course.title}
        </h3>
        <p
          className="text-sm text-gray-600 leading-snug overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.description}
        </p>
      </div>

      <div className="mt-4">
        {showProgress && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-700 font-medium mb-2">
              {course.progress}% completed
            </p>
          </>
        )}
        <div className="flex justify-between items-center text-gray-500 text-xs">
          <span>{course.duration}h</span>
          <span
            className={`px-2 py-1 rounded-full font-medium ${
              course.difficulty === "Beginner"
                ? "bg-green-100 text-green-700"
                : course.difficulty === "Intermediate"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {course.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
