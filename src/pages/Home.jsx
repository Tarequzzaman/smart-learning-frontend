import React from 'react';

const Home = () => {
  return (
    <main className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="text-center py-24 bg-indigo-50 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">Learn Smarter, Not Harder</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Get personalized content, AI-generated quizzes, and real-time progress tracking.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold">
            Get Started
          </a>
          <a href="/topics" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-100 font-semibold">
            Explore Topics
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p>Content is tailored to your interests and skill level using AI.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🧠</div>
            <h3 className="text-xl font-semibold mb-2">Smart Quizzes</h3>
            <p>AI-generated quizzes adapt to your learning style and performance.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📈</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p>Get real-time updates on your content completion and quiz scores.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto text-lg space-y-6">
          <p>1. Select your topics of interest</p>
          <p>2. Learn through personalized content</p>
          <p>3. Take AI-generated quizzes</p>
          <p>4. Receive hints and track your progress</p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-20 px-4 bg-indigo-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to level up your learning?</h2>
        <a href="/signup" className="bg-white text-indigo-600 px-6 py-3 rounded hover:bg-gray-100 font-semibold">
          Sign Up Now
        </a>
      </section>
      
    </main>
  );
};

export default Home;
