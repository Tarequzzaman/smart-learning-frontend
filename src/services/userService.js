// src/services/userService.js

// Mocked user data (replace with actual API later)
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com' },
  ];
  
  // Simulate fetching users
  export const getUsers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500); // Simulate delay
    });
  };
  