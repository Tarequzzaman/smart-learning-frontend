// src/services/analyticsService.js

export const getAnalyticsData = () => {
    return Promise.resolve({
      totalUsers: 245,
      topicsCreated: 36,
      totalQuizzes: 210,
      quizzesCompleted: 172,
      quizCompletionRate: 82,
      dailyNewUsers: [4, 8, 6, 5, 10, 7, 9],
      mostAttemptedTopics: [
        { title: 'Python Basics', users: 94 },
        { title: 'React Fundamentals', users: 78 },
        { title: 'AI in Education', users: 66 },
      ],
      leastAttemptedTopics: [
        { title: 'Web Accessibility', users: 7 },
        { title: 'Docker Essentials', users: 10 },
        { title: 'Testing with Jest', users: 12 },
      ],
    });
  };
  