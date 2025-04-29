import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompletedCourses = () => {
  const navigate = useNavigate();
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    setCompletedCourses([
      {
        id: 1,
        title: "Introduction to Python",
        description: "Learn Python basics for automation, scripting, and data analysis.",
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "React Development",
        description: "Modern React.js development using hooks, JSX, and components.",
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        description: "Supervised learning, unsupervised learning, model evaluation metrics.",
        difficulty: "Intermediate",
      },
      {
        id: 4,
        title: "Data Structures and Algorithms",
        description: "Master core computer science fundamentals for coding interviews.",
        difficulty: "Intermediate",
      },
      {
        id: 5,
        title: "Advanced SQL Techniques",
        description: "Deep dive into joins, indexes, query optimization, and big data.",
        difficulty: "Advanced",
      },
      {
        id: 6,
        title: "Cloud Fundamentals",
        description: "Learn AWS, GCP, and Azure basics: storage, compute, networking.",
        difficulty: "Beginner",
      },
    ]);
  }, []);

  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* Header */}
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Your Completed Courses
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Congratulations! Keep building your knowledge by exploring more topics.
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
                onClick={() => navigate('/dashboard/learning-feed', { state: { course } })}
                className="cursor-pointer flex-shrink-0 bg-white hover:bg-gray-50 transition-all transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between snap-start"
              >
                {/* Top Section */}
                <div>
                  <div className="mb-2">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">
                      🎓 Completed
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

                {/* Bottom Section */}
                <div className="mt-4">
                  {/* Always show 100% progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `100%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mb-2">
                    100% completed
                  </p>

                  <div className="flex justify-end items-center text-gray-500 text-xs">
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
