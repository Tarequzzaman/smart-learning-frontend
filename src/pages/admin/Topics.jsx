import React, { useEffect, useState } from "react";
import { createTopic, getTopics, updateTopic, deleteTopic } from '../../services/topicService';

const Topics = () => {
  const initialTopics = []; // empty on load, you can fetch from API later
  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState('');
  const [editTopic, setEditTopic] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [newTopic, setNewTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 7;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetched = await getTopics();
        setTopics(fetched);
      } catch (err) {
        alert(`Failed to load topics: ${err.message}`);
      }
    };

    fetchTopics();
  }, []);



  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * topicsPerPage;
  const indexOfFirst = indexOfLast - topicsPerPage;
  const currentTopics = filteredTopics.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);

  const handleUpdateTopic = async () => {
    try {
      const updated = await updateTopic(editTopic.id, {
        title: editTopic.title,
        description: editTopic.description,
      });
  
      setTopics((prev) =>
        prev.map((topic) => (topic.id === updated.id ? updated : topic))
      );
  
      setEditTopic(null);
    } catch (err) {
      alert(`Failed to update topic: ${err.message}`);
    }
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
            {currentTopics.map((topic, index) => (
              <tr key={topic.id || index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{topic.id}</td>
                <td className="px-4 py-2 border-b">{topic.title}</td>

                <td className="px-4 py-2 border-b">
                    <div
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: topic.description.replace(/\n/g, "<br>") }}
                    />
               </td>



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
                    onClick={() => setTopicToDelete(topic)}
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
                onClick={async () => {
                  try {
                    const created = await createTopic({
                      title: newTopic.title,
                      description: newTopic.description,
                    });

                    const newEntry = {
                      id: created.id,
                      title: created.title,
                      description: created.description,
                      createdBy: created.createdBy,
                      createdAt: new Date().toISOString().split("T")[0],
                    };

                    setTopics((prev) => [...prev, newEntry]);
                    setNewTopic(null);
                  } catch (err) {
                    alert(`Failed to create topic: ${err.message}`);
                  }
                }}
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {topicToDelete && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Confirm Deletion</h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <span className="font-bold">{topicToDelete.title}</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setTopicToDelete(null)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={async () => {
                try {
                  await deleteTopic(topicToDelete.id);
                  setTopics((prev) => prev.filter((t) => t.id !== topicToDelete.id));
                  setTopicToDelete(null);
                } catch (err) {
                  alert(`Failed to delete topic: ${err.message}`);
                }
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
