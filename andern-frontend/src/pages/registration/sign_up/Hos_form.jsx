import  { useState, useEffect } from 'react';
import ppl from "../../../assets/onboarding/log in/young doctors standing together.png"

const Form = () => {
  const questions = [
    { label: "What is your name?", type: "text", placeholder: "Enter your name" },
    { label: "What is your age?", type: "number", placeholder: "Enter your age" },
    { label: "Where do you live?", type: "text", placeholder: "Enter your address" },
    { label: "What is your favorite color?", type: "text", placeholder: "Enter your favorite color" },
    { label: "What is your favorite food?", type: "text", placeholder: "Enter your favorite food" },
    { label: "What is your occupation?", type: "text", placeholder: "Enter your occupation" },
    { label: "What is your favorite movie?", type: "text", placeholder: "Enter your favorite movie" },
    { label: "What is your favorite book?", type: "text", placeholder: "Enter your favorite book" },
    { label: "What is your favorite hobby?", type: "text", placeholder: "Enter your favorite hobby" },
    { label: "What is your pet's name?", type: "text", placeholder: "Enter your pet's name" },
    { label: "What is your favorite sport?", type: "text", placeholder: "Enter your favorite sport" },
    { label: "What is your favorite holiday destination?", type: "text", placeholder: "Enter your favorite holiday destination" },
    { label: "What is your favorite music genre?", type: "text", placeholder: "Enter your favorite music genre" },
    { label: "What is your favorite animal?", type: "text", placeholder: "Enter your favorite animal" },
    { label: "What is your favorite season?", type: "text", placeholder: "Enter your favorite season" }
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
    setCurrentPage(currentPage + 1);
    setShowNotification(false); // Hide notification when moving to the next page
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
    <div className="flex  flex-col relative h-screen justify-center items-center  gap-8 bg-gray-300">
      <div className='flex flex-col w-[50%] p-4 bg-white rounded-3xl'>
      {showNotification && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded" role="alert">
          <strong>Warning!</strong> Please answer all questions before saving.
        </div>
      )}
        <div className="grid grid-cols-2 items-center  mb-4">
            {questions.slice((currentPage - 1) * 10, currentPage * 10).map((question, index) => (
            <div key={index} className="flex justify-around">
                <div>
                <label htmlFor={`question${index + 1}`} className="block text-sm font-medium text-gray-700">{`${question.label}`}</label>
                <input
                    type={question.type}
                    id={`question${index + 1}`}
                    value={answers[index + (currentPage - 1) * 10]}
                    onChange={e => handleChange(index + (currentPage - 1) * 10, e.target.value)}
                    placeholder={question.placeholder}
                    className="mt-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                />
                </div>
                {index % 2 === 0 && <div></div>}
            </div>
            ))}
        </div>
        <div className='flex w-full items-start'>
                <div className="flex justify-center mb-4">
            <button
            type="button"
            onClick={handleSave}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-${progress === 100 ? 'blue' : 'gray'}-500 hover:bg-${progress === 100 ? 'blue' : 'gray'}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${progress === 100 ? 'blue' : 'gray'}-500`}
            >
            Save
            </button>
        </div>
        </div>
      </div>
      <div className="absolute top-[20rem] left-[16.5rem]">
            <img src={ppl}  className='w-[50%]' alt="" />
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
