import React, { useState, useEffect } from 'react';
import ppl from "../../../assets/onboarding/log in/young doctors standing together.png"

const Form = () => {
  const questions = [
    { label: " Your age", type: "text", placeholder: "0-99" },
    { label: " Blood type", type: "number", placeholder: " e.g AA" },
    { label: "Blood group", type: "text", placeholder: "O negative" },
    { label: "Wieght", type: "number", placeholder: "" },
    { label: "Date of Birth", type: "date", placeholder: "25 january 1990" },
    { label: "Current Adress", type: "text", placeholder: "Lagos, Ikeja,Nigeria" },
    { label: "Home  Adress", type: "text", placeholder: "Lagos, Ikeja,Nigeria" },
    { label: "City", type: "text", placeholder: "Lagos" },
    { label: "Postal", type: "text", placeholder: " 40614" },
    { label: "Country", type: "text", placeholder: "Nigeria" },
    { label: " Your allegies", type: "text", placeholder: "" },
    { label: "Have you had sugery  before", type: "text", placeholder: "Yes or No" }, 
  ];

  const [answers, setAnswers] = useState(Array(15).fill(''));
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const answeredQuestions = newAnswers.filter(answer => answer !== '');
    const newProgress = (answeredQuestions.length / questions.length) * 100;
    setProgress(newProgress);

    setShowNotification(false); // Hide notification when user starts answering questions
  };

  const handleSaveAndContinue = () => {
    if (currentPage === 1) {
      const firstPageAnswers = answers.slice(0, 10);
      const isAllAnswered = firstPageAnswers.every(answer => answer !== '');
      if (isAllAnswered) {
        setCurrentPage(currentPage + 1);
      } else {
        setShowNotification(true);
      }
    } else {
      setCurrentPage(currentPage + 1);
      setShowNotification(false); // Hide notification when moving to the next page
    }
  };
  

  const handleSave = () => {
    const answeredQuestions = answers.filter(answer => answer !== '');
    if (answeredQuestions.length === questions.length) {
      // All questions are answered
      // Handle save action
      alert('All questions are answered!');
    } else {
      setShowNotification(true); // Show notification if not all questions are answered
    }
  };

  return (
    <div className="flex relative flex-col  h-screen justify-center items-center gap-6  bg-gray-300">
    <div className=" relative w-full mb-8">
        <p className="text-4xl absolute left-[20rem] font-bold">
            Let Us Get To Know You
        </p>
    </div>
      <div className='relative flex w-full justify-center items-center  flex-col gap-8'>
        <div className='flex flex-col w-[50%] px-8 pt-6 pb-2 bg-white rounded-3xl'>
            {showNotification && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded" role="alert">
                <strong>Warning!</strong> Please answer all questions before proceeding.
            </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
            {questions.slice((currentPage - 1) * 10, currentPage * 10).map((question, index) => (
                <div key={index} className="flex justify-center">
                <div>
                    <label htmlFor={`question${index + 1}`} className="block text-sm font-medium text-gray-700">{`${question.label}`}</label>
                    <input
                    type={question.type}
                    id={`question${index + 1}`}
                    value={answers[index + (currentPage - 1) * 10]}
                    onChange={e => handleChange(index + (currentPage - 1) * 10, e.target.value)}
                    placeholder={question.placeholder}
                    className="mt-1 p-2 text-[#718EBF] border w-[18rem] border-gray-300 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm"
                    />
                </div>
                {index % 2 === 0 && <div></div>}
                </div>
            ))}
            </div>
            <div className='flex w-full items-end justify-end mr-8 '>
            <div className="flex justify-end mb-4">
            <button
                type="button"
                onClick={handleSave}
                className={`inline-flex items-center px-6 py-2 text-white border border-transparent text-sm font-medium rounded-md ${
                    progress === 100 ? 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                }`}
                >
                Save
            </button>

            </div>
            </div>
        </div>
        <div className="absolute top-[11rem] left-[16.5rem]">
            <img src={ppl} className='w-[90%]' alt="" />
        </div>
      </div>
      <div className=' '>
        {currentPage < Math.ceil(questions.length / 10) && (
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </div>
        )}
        <div>
          <div className="h-2 relative w-[50vh] rounded-full overflow-hidden mb-4">
            <div className="w-full h-full bg-gray-200 absolute"></div>
            <div className="h-full bg-black absolute" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
