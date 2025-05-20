import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../../services/topicService";

const ITEMS_PER_PAGE = 9;

const ExploreTopics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const totalPages = Math.ceil(topics.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTopics = topics.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <main className="bg-white min-h-screen text-gray-800">
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Explore All Topics
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Browse through all available topics and see how many courses are offered in each. Pick a topic that matches your interests and dive in!
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 mb-16">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading topics...</p>
        ) : topics.length === 0 ? (
          <p className="text-center text-gray-500">No topics available at the moment.</p>
        ) : (
          <>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => navigate(`/dashboard/topics/${topic.id}`)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

const TopicCard = ({ topic, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-br from-indigo-100 to-purple-100 hover:shadow-lg transition-all transform hover:-translate-y-1 rounded-xl p-6 flex flex-col justify-between border border-indigo-200"
    >
      <div>
        <div className="mb-2">
          <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full font-semibold">
            📂 Topic
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{topic.title}</h3>

        <p
          className="text-sm text-gray-700 leading-snug overflow-hidden text-ellipsis mb-4"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: topic.description }}
        ></p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700 text-sm">
          {topic.totalCourses}{" "}
          {topic.totalCourses === 1 ? "course" : "courses"}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent triggering the card click
            onClick();
          }}
          className="text-sm px-3 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white transition"
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

export default ExploreTopics;
