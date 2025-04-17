import React, { useState } from 'react';

const Topics = () => {
  const initialTopics = [
    { id: 1, title: 'Python Basics', description: 'Introduction to Python', createdBy: 'Admin', createdAt: '2025-04-10' },
    { id: 2, title: 'React for Beginners', description: 'Getting started with React', createdBy: 'Admin', createdAt: '2025-04-11' },
    { id: 3, title: 'AI in Education', description: 'Using AI to enhance learning', createdBy: 'Admin', createdAt: '2025-04-13' },
  ];

  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState('');
  const [editTopic, setEditTopic] = useState(null);
  const [deleteTopic, setDeleteTopic] = useState(null);
  const [newTopic, setNewTopic] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * topicsPerPage;
  const indexOfFirst = indexOfLast - topicsPerPage;
  const currentTopics = filteredTopics.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);

  const handleUpdateTopic = () => {
    setTopics((prev) =>
      prev.map((topic) => (topic.id === editTopic.id ? editTopic : topic))
    );
    setEditTopic(null);
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Manage Topics</h1>
        <input
          type="text"
          placeholder="Search by title..."
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Add Topic Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setNewTopic({ title: '', description: '', show: true })}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          + Add Topic
        </button>
      </div>

      {/* Topics Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Created By</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTopics.map((topic) => (
              <tr key={topic.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{topic.id}</td>
                <td className="px-4 py-2 border-b">{topic.title}</td>
                <td className="px-4 py-2 border-b">{topic.description}</td>
                <td className="px-4 py-2 border-b">{topic.createdBy}</td>
                <td className="px-4 py-2 border-b">{topic.createdAt}</td>
                <td className="px-4 py-2 border-b text-center space-x-4">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setEditTopic({ ...topic })}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setDeleteTopic(topic)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentTopics.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Edit Topic</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={editTopic.title}
                  onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  rows="4"
                  value={editTopic.description}
                  onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditTopic(null)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={handleUpdateTopic}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {newTopic?.show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Add New Topic</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Topic Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Topic Description</label>
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  rows="4"
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setNewTopic(null)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={() => {
                  const newEntry = {
                    id: topics.length + 1,
                    title: newTopic.title,
                    description: newTopic.description,
                    createdBy: 'Admin',
                    createdAt: new Date().toISOString().split('T')[0],
                  };
                  setTopics([...topics, newEntry]);
                  setNewTopic(null);
                }}
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-bold">{deleteTopic.title}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeleteTopic(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  setTopics(topics.filter((t) => t.id !== deleteTopic.id));
                  setDeleteTopic(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topics;
