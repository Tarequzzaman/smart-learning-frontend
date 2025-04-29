import React, { useEffect, useRef, useState } from "react";
import { getTopics } from "../services/topicService";
import { useNavigate } from "react-router-dom";

const emojis = ['🚀', '🧠', '📚', '💡', '🌟', '🧮', '💻', '🔬', '📝', '🎯'];

const ExploreTopics = () => {
  const [topics, setTopics] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (err) {
        console.error("Failed to fetch topics", err);
      }
    };

    fetchTopics();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280 * 4; // Adjust based on card width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Header */}
      <section className="text-center py-20 bg-indigo-50 mb-12 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">Explore Your Personalized Learning Topics</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-600">
          Discover personalized learning paths and start mastering new skills today.
        </p>
      </section>

      {/* Carousel Section */}
      <section className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          ←
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4 scroll-smooth"
        >
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              onClick={() => navigate("/login")}
              className="cursor-pointer flex-shrink-0 w-72 bg-indigo-50 hover:bg-indigo-100 transition rounded-xl shadow p-6 text-center"
            >
              <div className="text-4xl mb-4">
                {emojis[index % emojis.length]}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
              <p
                className="text-gray-600 text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: topic.description.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          →
        </button>
      </section>

      {/* Informational Section below the slider */}
      <section className="mt-12 px-4 md:px-12 text-center mb-20"> {/* <-- added mb-20 */}
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">What are these Topics?</h2>
      <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        Each topic you see here represents a complete learning experience — including personalized content,
        progress tracking, and AI-generated quizzes that adapt to your performance. Whether you're brushing up
        on basics or diving into new skills, our system guides you step by step and remembers your progress
        every time you return.
      </p>
      <p className="mt-4 text-indigo-600 font-medium">
        Select a topic to begin your smart learning journey!
      </p>
    </section>

    </main>
  );
};

export default ExploreTopics;
