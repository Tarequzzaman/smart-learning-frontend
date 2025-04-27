import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LearningFeedPage = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Problem Solving with Python",
      content: (
        <>
          <p>
            The basic tools for understanding the flow and results of simple
            programs are execution sheets and flowcharts. These are essential
            when solving problems using a structured approach.
          </p>
          <p className="mt-4">
            However, they become complicated when we have problems with a large
            number of decisions. Therefore, we provide executable embedded code
            widgets to observe program output by executing it.
          </p>
          <h4 className="mt-6 text-lg font-bold">Why Flowcharts?</h4>
          <p className="mt-2">
            Flowcharts help to visualize how different paths are connected. They
            are very important in early software design.
          </p>
          <h4 className="mt-6 text-lg font-bold">Execution Sheets</h4>
          <p className="mt-2">
            Execution sheets allow us to record the sequence of steps taken
            during execution. They are especially useful when debugging
            programs.
          </p>
          <p className="mt-6">
            When designing programs, it's helpful to manually trace through
            execution to predict results and spot logical errors early!
          </p>
          <p className="mt-4">
            Let's dive into some examples of creating flowcharts for basic
            problems like finding the largest of two numbers or calculating the
            factorial of a number.
          </p>
        </>
      ),
    },
    {
      title: "Hello World",
      content: (
        <>
          <p>
            It’s time to write our very first program in Python: the classic
            “Hello World!”.
          </p>
          <h4 className="mt-6 text-lg font-bold">Writing the Program</h4>
          <p className="mt-2">In Python, it's as simple as typing:</p>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            print("Hello World!")
          </pre>
          <p className="mt-4">
            That’s it! Python doesn’t require complicated setup. You simply run
            the script and your message is displayed.
          </p>
          <h4 className="mt-6 text-lg font-bold">Why Hello World?</h4>
          <p className="mt-2">
            It's a traditional first program that ensures your environment is
            correctly set up and you're able to run Python code successfully.
          </p>
          <h4 className="mt-6 text-lg font-bold">Common Mistakes</h4>
          <p className="mt-2">
            - Forgetting the parentheses in <code>print()</code>
            <br />- Using wrong quotes or mismatching quotes
            <br />- Typos in the word "print"
          </p>
          <p className="mt-6">
            Now let's customize it! Try printing your own message below instead
            of “Hello World!”.
          </p>
        </>
      ),
    },
    {
      title: "Variables in Python",
      content: (
        <>
          <p>
            Variables are containers for storing data values. In Python, you
            don’t need to declare the type of variable beforehand.
          </p>
          <h4 className="mt-6 text-lg font-bold">Creating Variables</h4>
          <p className="mt-2">
            You simply assign a value using the equals sign:
          </p>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            x = 5<br />
            name = "Alice"
          </pre>
          <p className="mt-4">
            Here, <code>x</code> is an integer and <code>name</code> is a
            string.
          </p>
          <h4 className="mt-6 text-lg font-bold">Dynamic Typing</h4>
          <p className="mt-2">
            Python uses dynamic typing, which means you can reassign different
            types to the same variable later:
          </p>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            x = 5<br />x = "Hello"
          </pre>
          <h4 className="mt-6 text-lg font-bold">Naming Rules</h4>
          <p className="mt-2">
            - Variable names must start with a letter or underscore.
            <br />- They can’t start with a number.
            <br />- They are case-sensitive: <code>Age</code> and{" "}
            <code>age</code> are different.
          </p>
          <p className="mt-6">
            Practice creating your own variables by assigning your age, your
            country, and your favorite food!
          </p>
        </>
      ),
    },
    {
      title: "Data Types",
      content: (
        <>
          <p>
            Python has several built-in data types. Understanding them is
            crucial as it defines what operations can be performed on a value.
          </p>
          <h4 className="mt-6 text-lg font-bold">Common Data Types</h4>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <strong>int</strong>: Integer numbers (e.g., 10, -3)
            </li>
            <li>
              <strong>float</strong>: Decimal numbers (e.g., 3.14, -0.01)
            </li>
            <li>
              <strong>str</strong>: Strings, i.e., text enclosed in quotes
            </li>
            <li>
              <strong>bool</strong>: Boolean values (True or False)
            </li>
          </ul>
          <h4 className="mt-6 text-lg font-bold">Type Checking</h4>
          <p className="mt-2">
            You can check the type of a variable using the <code>type()</code>{" "}
            function:
          </p>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            x = 10
            <br />
            print(type(x)) # Output: &lt;class 'int'&gt;
          </pre>
          <h4 className="mt-6 text-lg font-bold">Type Conversion</h4>
          <p className="mt-2">
            You can convert between types using functions like{" "}
            <code>int()</code>, <code>str()</code>, and <code>float()</code>.
          </p>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            a = "123"
            <br />b = int(a) # now b is an integer 123
          </pre>
          <p className="mt-6">
            Experiment with combining different types and observe what happens!
          </p>
        </>
      ),
    },
  ];

  const sectionRefs = sections.map(() => useRef(null));
  const progressPercentage = Math.round(
    (currentSection / sections.length) * 100
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMyAccountClick = () => {
    navigate("/dashboard/my-account");
  };

  const handleLogOutClick = () => {
    navigate("/dashboard/signin");
  };

  const handleQuizClick = () => {
    navigate("/dashboard/quiz");
  };

  const handleNextSection = () => {
    if (currentSection + 1 < sections.length) {
      sectionRefs[currentSection + 1].current.scrollIntoView({
        behavior: "smooth",
      });
      setCurrentSection(currentSection + 1);
    }
  };

  const handleScroll = () => {
    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setCurrentSection(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md p-6 flex flex-col fixed top-0 left-0 bottom-0">
        <div className="mb-6">
          <p className="text-gray-700 mb-2 font-semibold">
            {progressPercentage}% completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold mb-2">Python Basics</h3>
          <ul className="space-y-3">
            {sections.map((section, index) => (
              <li key={index}>
                <div
                  className={`flex items-center gap-2 text-gray-700 ${
                    currentSection >= index ? "text-purple-600" : ""
                  }`}
                >
                  {currentSection > index
                    ? "✅"
                    : currentSection === index
                    ? "🔘"
                    : "🔒"}{" "}
                  {section.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 ml-72">
        {dropdownVisible && (
          <div className="absolute right-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <ul className="space-y-2 p-3">
              <li>
                <button
                  onClick={handleMyAccountClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogOutClick}
                  className="w-full text-left text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="space-y-20">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={sectionRefs[index]}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="text-gray-700">{section.content}</div>

              {currentSection === index &&
                currentSection < sections.length - 1 && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleNextSection}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                    >
                      Next Section
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>

        {currentSection === sections.length - 1 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleQuizClick}
              className="bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Attempt Quiz Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningFeedPage;
