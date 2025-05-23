import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedCourses } from "../../services/courseService";

const CompletedCourses = () => {
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const courses = await getCompletedCourses();
        setCompletedCourses(courses);
      } catch (err) {
        console.error("Error fetching completed courses:", err.message);
      }
    };

    fetchCompleted();
  }, []);

  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* Header */}
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Your Completed Courses
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Congratulations! Keep building your knowledge by exploring more
          topics.
        </p>
      </section>

      {/* Completed Courses List */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        {completedCourses.length === 0 ? (
          <p className="text-center text-gray-500">No courses completed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate("/dashboard/detail-courses", {
                    state: { courseId: course.id },
                  })
                }
                className="cursor-pointer flex-shrink-0 bg-gray-100 hover:bg-gray-200 transition-all transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between snap-start"
              >
                {/* Top Section */}
                <div>
                  <div className="mb-2">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
                      🎓 Completed
                    </span>
                  </div>

                  {/* Title: allow wrap */}
                  <h3 className="text-md font-bold text-gray-800 mb-2 leading-snug break-words line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description: support <br> */}
                  <div
                    className="text-sm text-gray-600 leading-snug overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: course.description.replace(/\n/g, "<br>"),
                    }}
                  />
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `100%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mb-2">
                    100% completed
                  </p>

                  <div className="flex justify-between items-center text-gray-500 text-xs">
                    <span>Course Category</span>
                    <span
                      className={`px-2 py-1 rounded-full font-semibold ${
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CompletedCourses;
