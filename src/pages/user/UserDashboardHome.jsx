import React, { useState, useEffect, useRef } from "react";

const DashboardHome = () => {
  const myLearningRef = useRef(null);
  const recommendedRef = useRef(null);

  const [myLearning, setMyLearning] = useState([]);
  const [recommendedTopics, setRecommendedTopics] = useState([]);

  const [hoveredML, setHoveredML] = useState(null);
  const [hoveredRec, setHoveredRec] = useState(null);

  useEffect(() => {
    setMyLearning([
      {
        id: 1,
        title: "Introduction to Python",
        description: "Learn Python basics for automation, scripting, and data analysis.",
        progress: 45,
        duration: 30,
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Machine Learning Fundamentals",
        description: "Supervised learning, unsupervised learning, model evaluation metrics.",
        progress: 70,
        duration: 50,
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "React Development",
        description: "Modern React.js development using hooks, JSX, and components.",
        progress: 25,
        duration: 40,
        difficulty: "Intermediate",
      },
      {
        id: 4,
        title: "Data Structures",
        description: "Master arrays, linked lists, trees, graphs, and algorithms.",
        progress: 10,
        duration: 60,
        difficulty: "Intermediate",
      },
    ]);

    setRecommendedTopics([
      {
        id: 5,
        title: "System Design Interviews",
        description: "Design scalable real-world systems like YouTube, Twitter, etc.",
        duration: 70,
        difficulty: "Advanced",
      },
      {
        id: 6,
        title: "Advanced SQL",
        description: "Optimize SQL queries, joins, indexing, big data handling.",
        duration: 35,
        difficulty: "Intermediate",
      },
      {
        id: 7,
        title: "Deep Learning",
        description: "Train CNNs, RNNs, transformers using TensorFlow and PyTorch.",
        duration: 90,
        difficulty: "Advanced",
      },
      {
        id: 8,
        title: "Cloud Fundamentals",
        description: "AWS, GCP, Azure cloud basics: storage, compute, networking.",
        duration: 50,
        difficulty: "Beginner",
      },
    ]);
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const cardWidth = 300 + 24; // Card width + margin
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
<main className="bg-white min-h-screen text-gray-800">
<section className="text-center py-20 bg-indigo-50 mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
        Your Personalized Learning Dashboard
      </h1>
      <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
        Track your progress, explore new topics, and continue your learning journey with AI-curated content designed just for you.
      </p>
    </section>

      {/* === MY LEARNING SECTION === */}
      <section className="relative max-w-7xl mx-auto mb-16 group">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Learning</h2>

        {/* Hover Zones */}
        <div className="absolute top-0 left-0 h-full w-24 z-20 pointer-events-none">
          <div
            className="w-full h-full pointer-events-auto"
            onMouseEnter={() => setHoveredML("left")}
            onMouseLeave={() => setHoveredML(null)}
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-24 z-20 pointer-events-none">
          <div
            className="w-full h-full pointer-events-auto"
            onMouseEnter={() => setHoveredML("right")}
            onMouseLeave={() => setHoveredML(null)}
          />
        </div>

        {/* Left Arrow */}
        <button
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 hidden md:flex items-center justify-center hover:bg-gray-100 transition-opacity ${
            hoveredML === "left" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll(myLearningRef, "left")}
        >
          ←
        </button>

        {/* Scrollable Section */}
        <div
          ref={myLearningRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4 scroll-smooth snap-x snap-mandatory"
        >
          {myLearning.map((course) => (
            <CourseCard key={course.id} course={course} showProgress />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 hidden md:flex items-center justify-center hover:bg-gray-100 transition-opacity ${
            hoveredML === "right" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll(myLearningRef, "right")}
        >
          →
        </button>
      </section>

      {/* === RECOMMENDED FOR YOU SECTION === */}
      <section className="relative max-w-7xl mx-auto mb-20 group">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Recommended for You</h2>

        {/* Hover Zones */}
        <div className="absolute top-0 left-0 h-full w-24 z-20 pointer-events-none">
          <div
            className="w-full h-full pointer-events-auto"
            onMouseEnter={() => setHoveredRec("left")}
            onMouseLeave={() => setHoveredRec(null)}
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-24 z-20 pointer-events-none">
          <div
            className="w-full h-full pointer-events-auto"
            onMouseEnter={() => setHoveredRec("right")}
            onMouseLeave={() => setHoveredRec(null)}
          />
        </div>

        {/* Left Arrow */}
        <button
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 hidden md:flex items-center justify-center hover:bg-gray-100 transition-opacity ${
            hoveredRec === "left" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll(recommendedRef, "left")}
        >
          ←
        </button>

        {/* Scrollable Section */}
        <div
          ref={recommendedRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4 scroll-smooth snap-x snap-mandatory"
        >
          {recommendedTopics.map((topic) => (
            <CourseCard key={topic.id} course={topic} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 hidden md:flex items-center justify-center hover:bg-gray-100 transition-opacity ${
            hoveredRec === "right" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => scroll(recommendedRef, "right")}
        >
          →
        </button>
      </section>

    </main>
  );
};

const CourseCard = ({ course, showProgress }) => {
  return (
    <div className="cursor-pointer flex-shrink-0 w-[300px] h-[340px] bg-white hover:bg-gray-50 transition-all transform hover:-translate-y-1 rounded-xl shadow p-6 flex flex-col justify-between snap-start">
      
      {/* === Top Section: Badge, Title, Description === */}
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

      {/* === Bottom Section: Progress + Info === */}
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
