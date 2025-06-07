import React from 'react';

const Home = () => {
  return (
    <main className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="text-center py-24 bg-indigo-50 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          AI-Powered Learning Built Just for You
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Instantly generate personalized courses, track your learning progress, and master any topic with smart quizzes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold">
            Generate My First Course
          </a>
          <a href="/explore" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-100 font-semibold">
            Explore Topics
          </a>
        </div>
      </section>

      {/* What You’ll Get */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-10">What You’ll Get</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant AI-Created Courses</h3>
            <p>Select any topic — our AI builds a full, structured course just for you in seconds.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Learn At Your Own Pace</h3>
            <p>Study anytime, anywhere. Each section includes explanations, examples, and practice.</p>
          </div>
          <div>
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-xl font-semibold mb-2">Trackable Progress</h3>
            <p>Every quiz, every module — your progress is saved and reflected on your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform combines AI and education to provide a smarter, more engaging way to learn and grow.
        </p>
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
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Start learning in just a few clicks. Here’s the journey to becoming smarter, faster:
        </p>
        <div className="max-w-2xl mx-auto">
          <ol className="list-decimal list-inside space-y-4 text-lg text-gray-800">
            <li>Select your topics of interest</li>
            <li>Learn through personalized, AI-generated content</li>
            <li>Take quizzes to test and reinforce your knowledge</li>
            <li>Track your progress and unlock the next learning level</li>
          </ol>
        </div>
</section>

      {/* Call To Action */}
      <section className="text-center py-20 px-4 bg-indigo-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to level up your learning?</h2>
        <p className="mb-6">Sign up now and let AI guide your personalized learning journey.</p>
        <a href="/signup" className="bg-white text-indigo-600 px-6 py-3 rounded hover:bg-gray-100 font-semibold">
          Sign Up and Start Learning
        </a>
      </section>
      
    </main>
  );
};

export default Home;
