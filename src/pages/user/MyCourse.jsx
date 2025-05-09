import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchCourseById } from '../../services/courseService';
import { useLocation } from 'react-router-dom';

const CourseDetail = () => {
  const [courseData, setCourseData] = useState(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeSubsectionIndex, setActiveSubsectionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const { courseId } = location.state || {};

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!courseId) {
          console.error("No course ID provided");
          return;
        }
        const data = await fetchCourseById(courseId);
        setCourseData(data);
      } catch (error) {
        console.error("Failed to fetch course:", error.message);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!courseId) {
    return <div className="flex justify-center items-center h-screen text-red-500">No course selected.</div>;
  }

  if (!courseData) {
    return <div className="flex justify-center items-center h-screen">Loading course...</div>;
  }

  const { course_title, sections } = courseData;
  const activeContent = sections[activeSectionIndex].subsections[activeSubsectionIndex];

  const totalContentCount = sections.reduce(
    (acc, section) => acc + section.subsections.length,
    0
  );

  const hasPrevious = () => {
    return activeSectionIndex > 0 || activeSubsectionIndex > 0;
  };

  const hasNext = () => {
    return (
      activeSectionIndex < sections.length - 1 ||
      activeSubsectionIndex < sections[activeSectionIndex].subsections.length - 1
    );
  };

  const handlePrevious = () => {
    if (activeSubsectionIndex > 0) {
      setActiveSubsectionIndex((prev) => prev - 1);
    } else if (activeSectionIndex > 0) {
      const newSectionIndex = activeSectionIndex - 1;
      const lastSubIndex = sections[newSectionIndex].subsections.length - 1;
      setActiveSectionIndex(newSectionIndex);
      setActiveSubsectionIndex(lastSubIndex);
    }
  };

  const handleNext = () => {
    if (activeSubsectionIndex < sections[activeSectionIndex].subsections.length - 1) {
      setActiveSubsectionIndex((prev) => prev + 1);
    } else if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex((prev) => prev + 1);
      setActiveSubsectionIndex(0);
    }

    setProgress((prev) => {
      const increment = Math.round(90 / totalContentCount);
      const newProgress = prev + increment;
      return newProgress > 90 ? 90 : newProgress;
    });
  };

  const isLastContent =
    activeSectionIndex === sections.length - 1 &&
    activeSubsectionIndex === sections[sections.length - 1].subsections.length - 1;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg border-r sticky top-0 h-screen flex flex-col">
        
        {/* Progress Bar */}
        <div className="p-6 border-b">
          <div className="mb-6 mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-indigo-700">Progress</span>
              <span className="text-sm font-medium text-indigo-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sections (scrollable area) */}
        <div className="flex-1 overflow-y-auto p-6">
          {sections.map((section, secIdx) => (
            <div key={secIdx} className="mb-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{section.section_title}</h3>
              <ul className="space-y-2">
                {section.subsections.map((sub, subIdx) => (
                  <li key={subIdx}>
                    <button
                      onClick={() => {
                        setActiveSectionIndex(secIdx);
                        setActiveSubsectionIndex(subIdx);
                      }}
                      className={`w-full text-left text-sm rounded px-2 py-1 hover:bg-indigo-100 ${
                        activeSectionIndex === secIdx && activeSubsectionIndex === subIdx
                          ? 'bg-indigo-100 font-medium text-indigo-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {sub.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Course Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">
          {course_title}
        </h2>

        {/* Section Title */}
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">{activeContent.title}</h1>

        {/* Markdown Content */}
        <div
          className="prose prose-indigo prose-justify max-w-none mb-8 
            [&_p]:mb-6 
            [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg
            prose-a:text-indigo-600 prose-a:underline hover:prose-a:text-indigo-800"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const isHtmlCodeTag =
                  node?.tagName === 'code' && !inline && !className;

                if (inline || isHtmlCodeTag) {
                  return (
                    <code className="bg-gray-200 rounded px-1 py-0.5 text-sm font-mono">
                      {children}
                    </code>
                  );
                }

                const language = className?.replace('language-', '') || '';

                return (
                  <div className="flex justify-center my-4">
                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm">
                      <pre className="overflow-x-auto text-sm text-gray-800">
                        <code className={`font-mono ${className}`} {...props}>
                          {children}
                        </code>
                      </pre>
                      {language && (
                        <div className="text-right text-xs text-gray-500 italic mt-2">
                          {language}
                        </div>
                      )}
                    </div>
                  </div>
                );
              },
            }}
          >
            {activeContent.content}
          </ReactMarkdown>
        </div>

        {/* Quiz Prompt */}
        {isLastContent && (
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-indigo-700 mb-4">Evaluate your knowledge</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700">
              Attempt Quiz
            </button>
          </div>
        )}

        {/* Previous / Next Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious()}
            className={`rounded px-4 py-2 text-sm font-semibold border ${
              hasPrevious()
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!hasNext()}
            className={`rounded px-4 py-2 text-sm font-semibold border ${
              hasNext()
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
