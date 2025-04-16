import React, { useState } from 'react';

const Topics = () => {
  const [search, setSearch] = useState('');

  const topics = [
    { id: 1, title: 'Python Basics', createdBy: 'Admin', createdAt: '2025-04-10' },
    { id: 2, title: 'React for Beginners', createdBy: 'Admin', createdAt: '2025-04-11' },
    { id: 3, title: 'AI in Education', createdBy: 'Admin', createdAt: '2025-04-13' },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Manage Topics</h1>
        <input
          type="text"
          placeholder="Search by title..."
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Created By</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((topic) => (
              <tr key={topic.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{topic.id}</td>
                <td className="px-4 py-2 border-b">{topic.title}</td>
                <td className="px-4 py-2 border-b">{topic.createdBy}</td>
                <td className="px-4 py-2 border-b">{topic.createdAt}</td>
                <td className="px-4 py-2 border-b">
                  <button className="text-indigo-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}

            {filteredTopics.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topics;
