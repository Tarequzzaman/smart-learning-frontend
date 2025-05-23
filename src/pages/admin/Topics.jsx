import React, { useEffect, useState } from "react";
import {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
} from "../../services/topicService";

const Topics = () => {
  const initialTopics = [];
  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState("");
  const [editTopic, setEditTopic] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [newTopic, setNewTopic] = useState(null);
  const [viewCoursesFor, setViewCoursesFor] = useState(null); // 👈 For modal view
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const topicsPerPage = 7;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetched = await getTopics();
        setTopics(fetched);
      } catch (err) {
        setError(err.message || "Something went wrong.");
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
      setError(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-white rounded shadow p-6">
      {/* Error popup */}
      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded shadow">
          😔 {error}
        </div>
      )}
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
          onClick={() =>
            setNewTopic({ title: "", description: "", show: true })
          }
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
              <th className="px-4 py-2 border-b text-center">
                📚 Course Outlined
              </th>
              <th className="px-4 py-2 border-b text-center">
                🤖 AI-Generated Content
              </th>
              <th className="px-4 py-2 border-b text-center">View Courses</th>
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
                    dangerouslySetInnerHTML={{
                      __html: topic.description.replace(/\n/g, "<br>"),
                    }}
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {topic.totalCourses}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {topic.aiGeneratedCount}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                    onClick={() => setViewCoursesFor(topic)}
                  >
                    View Courses
                  </button>
                </td>
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
                <td colSpan="7" className="text-center py-4 text-gray-500">
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
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* View Courses Modal */}
      {viewCoursesFor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-indigo-700">
                Courses for "{viewCoursesFor.title}"
              </h2>
              <button
                className="text-gray-600 hover:text-gray-800 text-xl font-bold"
                onClick={() => setViewCoursesFor(null)}
              >
                ×
              </button>
            </div>
            {viewCoursesFor.courses && viewCoursesFor.courses.length > 0 ? (
              <ul className="space-y-4">
                {viewCoursesFor.courses.map((course) => (
                  <li
                    key={course.id}
                    className="border rounded p-4 shadow hover:shadow-md transition flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-indigo-700">
                        {course.course_title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {course.course_description}
                      </p>
                      <div className="text-xs mt-2">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          Level: {course.course_level}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          course.is_detail_created_by_ai
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.is_detail_created_by_ai
                          ? "Generated"
                          : "Generating"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">
                No courses available for this topic.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
              Edit Topic
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={editTopic.title}
                  onChange={(e) =>
                    setEditTopic({ ...editTopic, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  rows="4"
                  value={editTopic.description}
                  onChange={(e) =>
                    setEditTopic({ ...editTopic, description: e.target.value })
                  }
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
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
              Add New Topic
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded"
                  value={newTopic.title}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded"
                  rows="4"
                  value={newTopic.description}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, description: e.target.value })
                  }
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
                      totalCourses: created.totalCourses,
                      aiGeneratedCount: created.aiGeneratedCount,
                      courses: created.courses || [],
                    };

                    setTopics((prev) => [...prev, newEntry]);
                    setNewTopic(null);
                  } catch (err) {
                    setError(err.message || "Something went wrong.");
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
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{topicToDelete.title}</span>?
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
                    setTopics((prev) =>
                      prev.filter((t) => t.id !== topicToDelete.id)
                    );
                    setTopicToDelete(null);
                  } catch (err) {
                    setError(err.message || "Something went wrong.");
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
