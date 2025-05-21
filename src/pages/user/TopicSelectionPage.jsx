import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, submitUserInterest } from "../../services/topicService";
import { getUserSelectedTopics } from "../../services/userService";

const emojis = ["🚀", "🧠", "📚", "💡", "🌟", "🧮", "💻", "🔬", "📝", "🎯"];

const TopicSelectionPage = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allSelectedTopics, setAllSelectedTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);

        const authToken = localStorage.getItem("access_token");

        if (authToken) {
          const userSelectedTopics = await getUserSelectedTopics();
          setAllSelectedTopics(userSelectedTopics);
        } else {
          console.error("No auth token found.");
        }
      } catch (err) {
        console.error("Failed to fetch topics", err);
      }
    };

    fetchTopics();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280 * 3;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTopicClick = (topicId) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(topicId)) {
        return prevSelected.filter((id) => id !== topicId);
      } else {
        return [...prevSelected, topicId];
      }
    });
  };

  const handleContinue = async () => {
    setIsSubmitting(true);
    try {
      const data = await submitUserInterest(selectedTopics);
      alert(`Your selected topics have been submitted: ${data.message}`);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isSelected = (topicId) => selectedTopics.includes(topicId);
  const isDisabled = (topicId) =>
    allSelectedTopics.some((topic) => topic.id === topicId);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen text-gray-800">
      {/* Header */}
      <section className="text-center py-20 bg-indigo-50 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          Pick Topics You Love
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
          Choose the topics that spark your curiosity! We'll personalize your
          learning experience.
        </p>
      </section>

      {/* Search Bar */}
      <section className="max-w-xl mx-auto mb-10 px-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search topics like 'cooking', 'history', or 'coding'..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 inset-y-0 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ✖
            </button>
          )}
        </div>
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
          {filteredTopics.map((topic, index) => (
            <div
              key={topic.id}
              onClick={
                !isDisabled(topic.id) ? () => handleTopicClick(topic.id) : null
              }
              className={`flex-shrink-0 w-72 transition rounded-2xl shadow p-6 text-center
                ${
                  isSelected(topic.id)
                    ? "bg-indigo-300 border-2 border-indigo-500"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }
                ${isDisabled(topic.id) ? "opacity-30 cursor-not-allowed" : ""}
                ${!isDisabled(topic.id) ? "cursor-pointer" : ""}
              `}
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
      <div className="pb-24">
  <section className="mt-16 px-4 md:px-12 text-center">
    <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
      Why Pick Topics?
    </h2>
    <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
      Each topic represents a custom learning journey with smart content
      recommendations, progress tracking, and adaptive quizzes. Your picks
      help us personalize your experience!
    </p>
  </section>
</div>
    </main>
  );
};

export default TopicSelectionPage;
