// src/services/topicService.js

// Mocked topic data (replace with actual API later)
const mockTopics = [
    { id: 1, title: 'Python Basics', description: 'Learn Python from scratch.' },
    { id: 2, title: 'Advanced JavaScript', description: 'Master JavaScript for complex applications.' },
    { id: 3, title: 'Data Structures & Algorithms', description: 'Learn core data structures and algorithms.' },
  ];
  
  // Simulate fetching topics
  export const getTopics = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTopics);
      }, 500); // Simulate delay
    });
  };
  
  // Simulate creating a new topic
  export const createTopic = async (topicData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTopic = { id: mockTopics.length + 1, ...topicData };
        mockTopics.push(newTopic);
        resolve(newTopic);
      }, 500); // Simulate delay
    });
  };
  