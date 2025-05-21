import React, { useEffect, useState } from "react";
import { getRecommendedCourses, enrollInCourse } from "../../services/courseService";
import { useNavigate } from "react-router-dom";

const RecommendedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 12; // 4x3 layout
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getRecommendedCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch recommended courses:", error.message);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId);
      navigate("/dashboard/detail-courses", {
        state: { courseId },
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const paginatedCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <main className="bg-white min-h-screen text-gray-800 pb-20">
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Recommended Courses
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Explore personalized recommendations based on your interests.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-12">
        {paginatedCourses.length === 0 ? (
          <p className="text-center text-gray-500">No recommended courses available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleEnroll(course.id)}
              />
            ))}
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

const CourseCard = ({ course, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer w-full h-[340px] bg-gray-100 hover:bg-gray-200 transition transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between"
  >
    <div>
      <div className="mb-2">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
          📚 Course
        </span>
      </div>
      <h3 className="text-md font-bold text-gray-800 mb-2 leading-snug line-clamp-2">
        {course.title}
      </h3>
      <div
        className="text-sm text-gray-600 leading-snug overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{ __html: course.description.replace(/\n/g, "<br>") }}
      />
    </div>

    <div className="mt-4">
      <div className="flex justify-between items-center text-gray-500 text-xs">
        <span>Course Category</span>
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

export default RecommendedCourses;
