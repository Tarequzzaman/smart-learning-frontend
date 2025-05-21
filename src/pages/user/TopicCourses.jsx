import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { getCoursesByTopicId } from "../../services/courseService";

const TopicCourses = () => {
  const { id } = useParams(); // topic id from URL
  const navigate = useNavigate(); // ✅ for redirect

  const [topic, setTopic] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCoursesByTopicId(id);
        setTopic(data.topic);
        setCourses(data.courses);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Topic not found.
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* Error popup */}
      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded shadow">
          😔 {error}
        </div>
      )}
      {/* ✅ Header section */}
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          {topic.title}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Courses available for{" "}
          <span className="font-semibold">{topic.title}</span>
        </p>
      </section>

      {/* ✅ Courses grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">
            No courses available for this topic yet.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() =>
                  navigate("/dashboard/detail-courses", {
                    state: { courseId: course.id }, // ✅ same as DashboardHome
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick} // ✅ make it clickable
      className="cursor-pointer bg-white hover:bg-gray-50 transition-all transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between"
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
          className="text-sm text-gray-600 leading-snug overflow-hidden text-ellipsis mb-4"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: course.description }}
        ></p>
      </div>

      <div className="flex justify-between items-center text-gray-500 text-xs mt-4">
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
  );
};

export default TopicCourses;
