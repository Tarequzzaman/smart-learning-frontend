import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../../services/topicService";

interface Topic {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const emojis = ["🚀", "🧠", "📚", "💡", "🌟", "🧮", "💻", "🔬", "📝", "🎯"];

const TopicSelectionPage = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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


  };

  const handleTopicClick = (topicId: number) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(topicId)) {
        return prevSelected.filter((id) => id !== topicId);
      } else {
        return [...prevSelected, topicId];
      }
    });
  };

  return (
    <main className="bg-white min-h-screen text-gray-800 p-6">
      {/* Header */}
      <section className="text-center py-16 bg-indigo-50 mb-12 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Pick Topics You Love
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          Choose the topics that spark your curiosity! We'll personalize your
          learning experience.
        </p>
      </section>

      {/* Carousel Section */}
      <section className="relative max-w-7xl mx-auto">
        {/* Left Scroll Button */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          ←
        </button>

        {/* Topics Scroll */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-6 scroll-smooth"
        >
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              className={`cursor-pointer flex-shrink-0 w-72 transition rounded-2xl shadow p-6 text-center
                ${
                  isSelected(topic.id)
                    ? "bg-indigo-200 border-2 border-indigo-500"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }`}
            >
              <div className="text-5xl mb-4">
                {emojis[index % emojis.length]}
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                {topic.title}
              </h3>
              <p
                className="text-gray-600 text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: topic.description.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          →
        </button>
      </section>

      {/* Continue Button */}
      {selectedTopics.length > 0 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleContinue}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition"
          >
            Continue to your feed
          </button>
        </div>
      )}

      {/* Footer Info */}
      <section className="mt-16 px-4 md:px-12 text-center mb-20">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Why Pick Topics?
        </h2>
        <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Each topic represents a custom learning journey with smart content
          recommendations, progress tracking, and adaptive quizzes. Your picks
          help us personalize your experience!
        </p>
      </section>
    </main>
  );
};

export default TopicSelectionPage;
