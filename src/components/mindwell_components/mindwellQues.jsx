import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaRegMoon,
  FaSeedling,
  FaArrowRight,
  FaArrowLeft,
  FaChartLine,
  FaHome
} from "react-icons/fa";

function MindWellQues() {
  const navigate = useNavigate();
  const questions = [
    "What is your age?",
    "What is your gender?",
    "What's your country?",
    "Are you self-employed?",
    "Do you have a family history of mental illness?",
    "How often does your mental health interfere with work?",
    "How many employees are in your company?",
    "Do you work remotely?",
    "Do you work in a tech company?",
    "Does your employer provide mental health benefits?",
    "Are care options available from your employer?",
    "Does your employer have a wellness program?",
    "Is help-seeking encouraged at your workplace?",
    "Is anonymity maintained if you seek help?",
    "How easy is it to take leave for mental health reasons?",
    "Are there negative consequences of disclosing a mental health issue?",
    "Are there negative consequences of disclosing a physical health issue?",
    "Are your coworkers supportive of mental health issues?",
    "Is your supervisor supportive of mental health issues?",
    "Would you discuss a mental health issue in an interview?",
    "Would you discuss a physical health issue in an interview?",
    "Do you think mental and physical health are treated equally?",
    "Have you ever faced consequences for mental health issues at work?"
  ];

  const questionInputTypes = {
    0: "number",
    1: "radio",
    2: "select",
    3: "radio",
    14: "radio",
  };

  const questionOptions = {
    1: {
      type: 'radio',
      options: [
        { label: "Male", value: 1 },
        { label: "Female", value: 0 },
        { label: "Non-binary", value: 2 },
        { label: "Prefer not to say", value: 15 }
      ]
    },
    2: {
      type: 'select',
      options: [
        { label: "India", value: 1 },
        { label: "USA", value: 2 },
        { label: "Canada", value: 3 },
        { label: "UK", value: 4 },
        { label: "Australia", value: 5 },
        { label: "Germany", value: 6 }
      ]
    },
    3: {
      type: 'radio',
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
        { label: "Prefer not to say", value: -1 }
      ]
    },
    4: {
      type: 'radio',
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
        { label: "Not sure", value: -1 }
      ]
    },
    13: {
      type: 'radio',
      options: [
        { label: "Easy", value: 1 },
        { label: "Moderate", value: 0.5 },
        { label: "Difficult", value: 0 },
        { label: "Don't know", value: -1 }
      ]
    }
  };

  const defaultOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
    { label: "Sometimes", value: 0.5 },
    { label: "Prefer not to say", value: -1 }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && result === null && !isSubmitting) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, answer, responses, result, isSubmitting]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setError("");
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswer(responses[currentQuestionIndex - 1]?.answer || "");
    }
  };

  const handleNext = async () => {
    if (!answer) {
      setError("Please provide an answer");
      return;
    }

    const inputType = questionInputTypes[currentQuestionIndex];
    if (inputType === "number" && isNaN(parseFloat(answer))) {
      setError("Please enter a valid number");
      return;
    }

    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = {
      question: questions[currentQuestionIndex],
      answer
    };
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => {
        const nextIndex = prev + 1;
        setAnswer(updatedResponses[nextIndex]?.answer || "");
        return nextIndex;
      });
    } else {
      setIsSubmitting(true);
      try {
        const numericalAnswers = questions.map((_, idx) => {
          const resp = updatedResponses[idx];
          if (!resp) return -1;

          const type = questionInputTypes[idx];
          const opts = questionOptions[idx];

          if (type === "number") {
            return parseFloat(resp.answer) || -1;
          } else if (opts) {
            const option = opts.options.find(opt => opt.label === resp.answer);
            return option ? option.value : -1;
          } else {
            const matchedOption = defaultOptions.find(opt => opt.label === resp.answer);
            return matchedOption ? matchedOption.value : -1;
          }
        });

        const res = await axios.post("http://localhost:8080/predict", {
          answers: numericalAnswers
        });

        setResult(res.data.mentalState);
      } catch (err) {
        console.error("Error:", err);
        setResult("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <FaLeaf className="absolute inset-0 text-emerald-400 animate-pulse" size={40} />
              <FaSeedling className="absolute inset-0 text-teal-500 animate-ping opacity-50" size={40} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Analyzing your responses</h1>
          <p className="text-gray-600 mb-6">We're carefully reviewing your answers</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (result !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`p-8 text-center ${result === 1 ? "bg-emerald-100" : result === 0 ? "bg-amber-100" : "bg-blue-100"}`}>
            <div className="flex justify-center mb-4">
              {result === 1 ? (
                <FaSeedling className="text-emerald-600" size={48} />
              ) : result === 0 ? (
                <FaRegMoon className="text-amber-600" size={48} />
              ) : (
                <div className="relative">
                  <FaLeaf className="text-blue-500" size={48} />
                  <FaChartLine className="absolute -top-2 -right-2 text-blue-700 bg-blue-100 rounded-full p-1" size={24} />
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {result === 1 
                ? "Healthy State of Mind" 
                : result === 0 
                  ? "Potential Challenges Detected" 
                  : "Mental Wellness Review"}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {result === 1 
                ? "Your responses indicate a positive mental wellness state. Keep maintaining your healthy habits!"
                : result === 0 
                  ? "Our analysis suggests you might benefit from additional mental wellness support."
                  : "Your mental wellness status requires further professional evaluation."}
            </p>
          </div>
          
          <div className="p-6 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <FaHome /> Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setAnswer("");
                  setResponses([]);
                  setResult(null);
                }}
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Retake Test <FaSeedling />
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="font-medium text-gray-700 mb-2">Your Mental Wellness Journey</h3>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-300"></div>
                <div className="w-3 h-3 rounded-full bg-amber-300"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentOptions = questionOptions[currentQuestionIndex]?.options || defaultOptions;
  const inputType = questionInputTypes[currentQuestionIndex] || "radio";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-emerald-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            {questions[currentQuestionIndex]}
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-8">
            {inputType === "number" ? (
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                  value={answer}
                  onChange={handleAnswerChange}
                  placeholder="Enter your answer..."
                  min="0"
                  autoFocus
                />
              </div>
            ) : inputType === "select" ? (
              <div className="relative">
                <select
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg appearance-none bg-white"
                  value={answer}
                  onChange={handleAnswerChange}
                  autoFocus
                >
                  <option value="">Select your country</option>
                  {currentOptions.map((opt) => (
                    <option key={opt.value} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentOptions.map((opt) => (
                  <label 
                    key={opt.value} 
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      answer === opt.label 
                        ? "border-emerald-500 bg-emerald-50 shadow-sm" 
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={opt.label}
                      checked={answer === opt.label}
                      onChange={handleAnswerChange}
                      className="sr-only"
                    />
                    <span className="text-gray-700 font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 py-3 px-5 rounded-lg ${
                currentQuestionIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaArrowLeft /> Previous
            </button>
            
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <>
                  See Results <FaChartLine />
                </>
              ) : (
                <>
                  Next <FaArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MindWellQues;