import React from "react";
import { useNavigate } from "react-router-dom";
import flowImage from "../assets/about.png"; // update if needed

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-white text-gray-800">
    

      {/* Flowchart Image Section */}
      <section className="bg-white px-6 md:px-20 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
    {/* Left Side: Text */}
    <div className="md:w-1/2 text-center md:text-left -mt-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
        About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We use AI to create personalized learning journeys that match your interests and pace. From topic selection
            to content generation and progress tracking, our system makes learning smarter and more engaging than ever.
            <br /><br />
            Unlike traditional learning platforms, Smart Learning Companion adapts to your strengths, weaknesses, and progress
            in real-time. Whether you're brushing up on fundamentals or diving deep into a new skill, our AI ensures that 
            every piece of content you see is tailored just for you. With interactive quizzes, progress insights, and a 
            user-friendly experience, we’re building a future where education is not just smart — it's truly personal.
            </p>
        <button
        className="bg-indigo-700 text-white py-2 px-6 rounded-full font-medium hover:bg-indigo-800 transition"
        onClick={() => navigate("/explore")}
        >
        Explore Topics
        </button>
    </div>

  {/* Right Side: Plain Image (no box, no shadow) */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src={flowImage}
      alt="Learning System Overview"
      className="max-w-md w-full"
    />
  </div>
</section>



{/* Mission, Vision, and Values Section */}
<section className="px-6 md:px-20 py-16 bg-white text-center mb-20">
  <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-12">
    Our Mission, Vision & Values
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
    {/* Mission */}
    <div className="p-6 rounded-xl bg-indigo-50">
      <div className="text-4xl mb-4 text-indigo-600 text-center">🎯</div>
      <h3 className="text-2xl font-bold text-indigo-700 mb-3 text-center">Our Mission</h3>
      <p className="text-gray-700 leading-relaxed text-md">
        To empower every learner with a personalized, AI-driven journey that adapts to their pace, needs, and curiosity — making learning engaging, efficient, and enjoyable.
      </p>
    </div>

    {/* Vision */}
    <div className="p-6 rounded-xl bg-indigo-50">
      <div className="text-4xl mb-4 text-indigo-600 text-center">🌍</div>
      <h3 className="text-2xl font-bold text-indigo-700 mb-3 text-center">Our Vision</h3>
      <p className="text-gray-700 leading-relaxed text-md">
        A future where education is no longer one-size-fits-all — but dynamically crafted for each individual through intelligent systems and human-centered design.
      </p>
    </div>

    {/* Core Values */}
    <div className="p-6 rounded-xl bg-indigo-50">
      <div className="text-4xl mb-4 text-indigo-600 text-center">💡</div>
      <h3 className="text-2xl font-bold text-indigo-700 mb-3 text-center">Our Values</h3>
      <p className="text-gray-700 leading-relaxed text-md">
        We stand for innovation, personalization, accessibility, and lifelong learning — building tools that put learners first and ensure progress is always possible.
      </p>
    </div>
  </div>
</section>




      {/* Final CTA Section */}
      <section className="bg-indigo-700 py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Learn Smarter?</h2>
        <p className="text-lg mb-6">
          Explore topics that match your interest and start your personalized learning journey.
        </p>
        <button
          className="bg-white text-indigo-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </section>
    </main>
  );
};

export default AboutUs;
