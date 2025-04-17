import React, { useEffect, useState } from 'react';
import { getAnalyticsData } from '../../services/analyticsService';
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAnalyticsData().then(setStats);
  }, []);

  if (!stats) return <p className="p-6 text-gray-500">Loading analytics...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">👥 Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">📚 Topics Created</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{stats.topicsCreated}</p>
        </div>
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">📝 Quizzes Created</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">{stats.totalQuizzes}</p>
        </div>
      </div>

      {/* Quiz Stats + Bar Graph */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🧠 Quizzes Completed</h2>
          <p className="text-4xl font-bold text-indigo-600">{stats.quizzesCompleted}</p>
          <p className="mt-2 text-gray-600">
            ✅ Completion Rate: <strong>{stats.quizCompletionRate}%</strong>
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📅 Daily New Users</h2>
          <div className="flex space-x-2 h-32 items-end">
            {stats.dailyNewUsers.map((count, i) => (
              <div
                key={i}
                className="bg-indigo-500 w-6 rounded-t"
                style={{ height: `${count * 8}px` }}
                title={`Day ${i + 1}: ${count} users`}
              ></div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Last 7 days</p>
        </div>
      </div>

      {/* Most & Least Attempted Topics */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">🔥 Most Attempted Topics</h2>
          <ul className="text-gray-700 space-y-2">
            {stats.mostAttemptedTopics.map((topic, i) => (
              <li key={i} className="flex justify-between">
                <span>{topic.title}</span>
                <span className="text-sm text-gray-500">{topic.users} users</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">🧊 Least Attempted Topics</h2>
          <ul className="text-gray-700 space-y-2">
            {stats.leastAttemptedTopics.map((topic, i) => (
              <li key={i} className="flex justify-between">
                <span>{topic.title}</span>
                <span className="text-sm text-gray-500">{topic.users} users</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
