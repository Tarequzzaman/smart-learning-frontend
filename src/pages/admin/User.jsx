import React, { useState } from 'react';

const Users = () => {
  const initialUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'User' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'Admin' },
    { id: 3, firstName: 'Michael', lastName: 'Lee', email: 'michael@example.com', role: 'User' },
    { id: 4, firstName: 'Emily', lastName: 'Davis', email: 'emily@example.com', role: 'User' },
    { id: 5, firstName: 'Chris', lastName: 'Brown', email: 'chris@example.com', role: 'User' },
    { id: 6, firstName: 'Nina', lastName: 'Wilson', email: 'nina@example.com', role: 'User' },
    { id: 7, firstName: 'Robert', lastName: 'Gray', email: 'robert@example.com', role: 'User' },
    { id: 8, firstName: 'Sophia', lastName: 'Turner', email: 'sophia@example.com', role: 'Admin' },
    { id: 9, firstName: 'Liam', lastName: 'Scott', email: 'liam@example.com', role: 'User' },
    { id: 10, firstName: 'Olivia', lastName: 'Clark', email: 'olivia@example.com', role: 'User' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const usersPerPage = 8;

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editUser.id ? editUser : user))
    );
    setEditUser(null);
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Manage Users</h1>
        <input
          type="text"
          placeholder="Search by email..."
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="px-4 py-2 border-b">User ID</th>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-8 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.id}</td>
                <td className="px-4 py-2 border-b">{user.firstName}</td>
                <td className="px-4 py-2 border-b">{user.lastName}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-8 py-2 border-b text-center space-x-4">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setEditUser({ ...user })}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
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
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Edit User</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editUser.firstName}
                  onChange={(e) =>
                    setEditUser({ ...editUser, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={editUser.lastName}
                  onChange={(e) =>
                    setEditUser({ ...editUser, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-bold">{deleteUser.firstName} {deleteUser.lastName}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeleteUser(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => {
                  setUsers(users.filter((u) => u.id !== deleteUser.id));
                  setDeleteUser(null);
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

export default Users;
