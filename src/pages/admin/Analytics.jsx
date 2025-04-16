// src/pages/AdminDashboard.jsx

import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Analytics</h1>

      {/* Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">245</p>
        </div>
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">Topics Created</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">36</p>
        </div>
        <div className="bg-white rounded shadow p-5">
          <h3 className="text-lg font-semibold text-gray-600">Active Quizzes</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">118</p>
        </div>
      </div>

      {/* Placeholder analytics section */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Analytics Overview</h2>
        <div className="text-gray-500">
          <p>📈 Weekly User Growth: +15%</p>
          <p>🧠 Most Active Topic: "Python Basics"</p>
          <p>🎯 Quiz Completion Rate: 82%</p>
        </div>
      </div>

      {/* Placeholder table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent User Signups</h2>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Signup Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2">John Doe</td>
              <td className="py-2">john@example.com</td>
              <td className="py-2">2025-04-10</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2">Jane Smith</td>
              <td className="py-2">jane@example.com</td>
              <td className="py-2">2025-04-12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
