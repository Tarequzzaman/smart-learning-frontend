import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchCourseById, updateCourseProgress } from '../../services/courseService';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  /* ───────── state ───────── */
  const [courseData, setCourseData]                       = useState(null);
  const [activeSectionIndex, setActiveSectionIndex]       = useState(0);
  const [activeSubsectionIndex, setActiveSubsectionIndex] = useState(0);
  const [unlockedSteps, setUnlockedSteps]                 = useState([{ section: 0, subsection: 0 }]);
  const [progress, setProgress]                           = useState(0);
  const [sectionQuizStatus, setSectionQuizStatus]         = useState({});

  const location  = useLocation();
  const navigate  = useNavigate();
  const { courseId, completedSection } = location.state || {};

  /* ───── fetch once ───── */
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return console.error('No course ID provided');
      try {
        const data = await fetchCourseById(courseId);
        setCourseData(data);

        /* seed quiz status map */
        setSectionQuizStatus(data.quiz_status || {});

        /* restore unlock / active indices from stored progress */
        const { sections, course_progress } = data;
        const total         = sections.reduce((a, s) => a + s.subsections.length + 1, 0);
        const unlockedCount = Math.floor((course_progress / 100) * total);

        const steps   = [];
        let counter   = 0;
        let finished  = false;
        for (let s = 0; s < sections.length && !finished; s++) {
          for (let sub = 0; sub < sections[s].subsections.length; sub++) {
            steps.push({ section: s, subsection: sub });
            if (counter === unlockedCount) {
              setActiveSectionIndex(s);
              setActiveSubsectionIndex(sub);
              finished = true;
              break;
            }
            counter++;
          }
        }
        setUnlockedSteps(steps);
        setProgress(Math.round(Math.min(course_progress, 100)));
      } catch (err) {
        console.error('Failed to fetch course:', err.message);
      }
    };
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  /* ───── quiz finished (PASS only) ───── */
  useEffect(() => {
    if (!courseData || completedSection === undefined) return;

    /* mark this quiz as passed */
    setSectionQuizStatus(prev => ({ ...prev, [completedSection]: true }));

    /* bump progress (leaving 10 % room for final badge/whatever) */
    const total      = courseData.sections.reduce((a, s) => a + s.subsections.length + 1, 0);
    const increment  = 100 / total;
    const newProgress = Math.round(Math.min(progress + increment, 100));
    setProgress(newProgress);
    updateCourseProgress(courseId, newProgress).catch(console.error);

    /* clean state so a page refresh doesn’t re-run this block */
    navigate(location.pathname, { replace: true, state: { courseId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedSection, courseData]);

  /* ───── guards ───── */
  if (!courseId)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        No course selected.
      </div>
    );
  if (!courseData)
    return (
      <div className="flex justify-center items-center min-h-screen">Loading course...</div>
    );

  const { course_title, sections } = courseData;
  const activeContent = sections[activeSectionIndex].subsections[activeSubsectionIndex];

  const isUnlocked = (s, sub) =>
    unlockedSteps.some(step => step.section === s && step.subsection === sub);

  const isSectionEnd =
    activeSubsectionIndex === sections[activeSectionIndex].subsections.length - 1;

  const quizDone = !!sectionQuizStatus[activeSectionIndex];

  const hasPrevious = () => activeSectionIndex > 0 || activeSubsectionIndex > 0;

  const canGoForward =
    !isSectionEnd ||
    (isSectionEnd && quizDone && activeSectionIndex < sections.length - 1);

  /* ───── navigation ───── */
  const handlePrevious = () => {
    if (activeSubsectionIndex > 0) {
      setActiveSubsectionIndex(prev => prev - 1);
    } else if (activeSectionIndex > 0) {
      const newSec  = activeSectionIndex - 1;
      const lastSub = sections[newSec].subsections.length - 1;
      setActiveSectionIndex(newSec);
      setActiveSubsectionIndex(lastSub);
    }
  };

  const handleNext = () => {
    /* inside current section */
    if (activeSubsectionIndex < sections[activeSectionIndex].subsections.length - 1) {
      const nextSub = activeSubsectionIndex + 1;
      const nextSec = activeSectionIndex;

      /* unlock next subsection */
      if (!isUnlocked(nextSec, nextSub)) {
        setUnlockedSteps(prev => [...prev, { section: nextSec, subsection: nextSub }]);

        const total      = sections.reduce((a, s) => a + s.subsections.length, 0);
        const increment  = Math.round(90 / total);
        const newProgress = Math.round(Math.min(progress + increment, 100));
        setProgress(newProgress);
        updateCourseProgress(courseId, newProgress).catch(console.error);
      }

      setActiveSubsectionIndex(nextSub);
      return;
    }

    /* end-of-section → allowed only after quiz passed */
    if (quizDone && activeSectionIndex < sections.length - 1) {
      const nextSection = activeSectionIndex + 1;

      if (!isUnlocked(nextSection, 0)) {
        setUnlockedSteps(prev => [...prev, { section: nextSection, subsection: 0 }]);
      }

      setActiveSectionIndex(nextSection);
      setActiveSubsectionIndex(0);
    }
  };

  const handleAttemptQuiz = () => {
    navigate('/dashboard/quiz', {
      state: {
        courseId,
        sectionIndex: activeSectionIndex,
      },
    });
  };

  /* ───── render ───── */
  return (
    <>
      {/* outer wrapper: column on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 overflow-hidden">
        
        {/* ───────── Sidebar ───────── */}
        <aside
          className="
            w-full md:w-72
            bg-white shadow-lg border-b md:border-r
            flex flex-col
            md:sticky md:top-0
            max-h-60 md:max-h-none
          "
        >
          <div className="p-4 md:p-6 border-b">
            <div className="mb-6 mt-2 md:mt-4">
              <div className="flex justify-between mb-2 text-sm font-medium text-indigo-700">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* sections list */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {sections.map((section, secIdx) => (
              <div key={secIdx} className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  {section.section_title}
                </h3>
                <ul className="space-y-2">
                  {section.subsections.map((sub, subIdx) => {
                    const isActive =
                      activeSectionIndex === secIdx && activeSubsectionIndex === subIdx;
                    const unlocked = isUnlocked(secIdx, subIdx);
                    return (
                      <li key={subIdx}>
                        <button
                          disabled={!unlocked}
                          onClick={() => {
                            if (unlocked) {
                              setActiveSectionIndex(secIdx);
                              setActiveSubsectionIndex(subIdx);
                            }
                          }}
                          className={`w-full text-left text-sm rounded px-2 py-1 flex items-center gap-2 ${
                            unlocked
                              ? isActive
                                ? 'bg-indigo-100 font-medium text-indigo-700'
                                : 'text-gray-700 hover:bg-indigo-50'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {unlocked ? '✅' : '🔒'} {sub.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* ───────── Content ───────── */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-indigo-700 mt-4 md:mt-8 mb-8 md:mb-14">
            {course_title}
          </h2>

          <h1 className="text-xl md:text-2xl font-bold text-indigo-700 mb-4 md:mb-6">
            {activeContent.title}
          </h1>

          <div
            className="
              prose prose-indigo prose-justify max-w-none mb-6 md:mb-8
              [&_p]:mb-6 
              [&_h1]:text-xl md:[&_h1]:text-2xl
              [&_h2]:text-lg  md:[&_h2]:text-xl
              [&_h3]:text-base md:[&_h3]:text-lg
              prose-a:text-indigo-600 prose-a:underline hover:prose-a:text-indigo-800
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const isHtmlInline = node?.tagName === 'code' && !inline && !className;
                  if (inline || isHtmlInline) {
                    return (
                      <code className="bg-gray-200 rounded px-1 py-0.5 text-sm font-mono">
                        {children}
                      </code>
                    );
                  }

                  const language = className?.replace('language-', '') || '';
                  const codeString = String(children).trim();
                  const [copied, setCopied] = React.useState(false);

                  const handleCopy = () => {
                    navigator.clipboard.writeText(codeString).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    });
                  };

                  return (
                    <div className="relative my-4 group">
                      {/* Copy button */}
                      <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 transition-all text-xs"
                      >
                        {copied ? 'Copied!' : (
                          <svg
                            aria-hidden="true"
                            height="20"
                            viewBox="0 0 16 16"
                            width="20"
                            className="text-gray-500 hover:text-indigo-600 transition"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
                            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
                          </svg>
                        )}
                      </button>

                      {/* Code block */}
                      <div className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
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
                }
              }}
            >
              {activeContent.content}
            </ReactMarkdown>
          </div>

          {/* ───────── Quiz Prompt ───────── */}
          {isSectionEnd && !quizDone && (
            <div className="mt-6 md:mt-8 text-center">
              <p className="text-base md:text-lg font-semibold text-indigo-700 mb-3 md:mb-4">
                Ready to test your understanding of this section?
              </p>
              <button
                onClick={handleAttemptQuiz}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
              >
                Attempt Quiz
              </button>
            </div>
          )}

          {/* ───────── Nav Buttons ───────── */}
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 mt-8 md:mt-10">
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
              disabled={!canGoForward}
              className={`rounded px-4 py-2 text-sm font-semibold border ${
                canGoForward
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSectionEnd ? 'Next Section →' : 'Next →'}
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default CourseDetail;
