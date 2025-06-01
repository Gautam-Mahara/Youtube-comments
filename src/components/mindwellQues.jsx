import React, { useState } from "react";
import axios from "axios";
// import "./cssfiles/mindwellques.css";
import './cssfiles/test.css'
import { 
  FaLeaf, 
  FaRegMoon,
  FaCloud,
  FaWater,
  FaSeedling
} from "react-icons/fa";

function MindWellQues() {
  const questions = [
    "What is your age?",
    "What is your gender? (e.g., Male=1, Female=0, Other=15)",
    "whats is your country? (e.g., India=45, USA=46, UK=48)",
    "Are you self-employed?",
    "Do you have a family history of mental illness?",
    "How often does your mental health interfere with work?",
    "How many employees are in your company? (encoded value)",
    "Do you work remotely?",
    "Do you work in a tech company?",
    "Does your employer provide mental health benefits?",
    "Are care options available from your employer?",
    "Does your employer have a wellness program?",
    "Is help-seeking encouraged at your workplace?",
    "Is anonymity maintained if you seek help?",
    "How easy is it to take leave for mental health reasons? (encoded)",
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
    1: "number",
    13: "number"
  };

  const options = ["Strongly ", "No", "Maybe", "Do not answer"];
  const answerIcons = {
    "Yes": <FaSeedling className="option-icon" />,
    "No": <FaLeaf className="option-icon" />,
    "Maybe": <FaCloud className="option-icon" />,
    "Do not answer": <FaWater className="option-icon" />
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const commonAnswerMapping = {
    "Yes": 1,
    "No": 0,
    "Maybe": 0.5,
    "Do not answer": -1,

  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  // on enter key, move to next question
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
        handleNext();
        }
    };

  const handleNext = async () => {
    if (!answer) {
      alert("Please provide an answer");
      return;
    }

    const inputType = questionInputTypes[currentQuestionIndex];
    if (inputType === "number" && isNaN(parseFloat(answer))) {
      alert("Please enter a valid number");
      return;
    }

    const updatedResponses = [...responses, {
      question: questions[currentQuestionIndex],
      answer
    }];
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer("");
    } else {
      setIsSubmitting(true);
      try {
        const numericalAnswers = updatedResponses.map((resp, idx) => {
          const type = questionInputTypes[idx];
          if (type === "number") {
            const val = parseFloat(resp.answer);
            return isNaN(val) ? -1 : val;
          }
          return commonAnswerMapping[resp.answer] ?? -1;
        });

        const res = await axios.post("http://localhost:8080/predict", {
             answers: numericalAnswers
  // No need to send questions array at all unless backend specifically requires it
        });
        // logging the response for debugging in the browser console
        console.log(`Response: ${JSON.stringify(res.data)}`);      
        setResult(res.data.mentalState);
      } catch (error) {
        console.error("Error:", error);
        setResult("Error analyzing responses");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitting) {
    return (
      <div className="question-container">
        <div className="loading-animation">
          <FaLeaf className="spinning-leaf" />
          <h1>Gently analyzing your responses...</h1>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h1>Your Mental Wellness Profile</h1>
          <div className="result-content">
            <FaSeedling className="result-icon" />
            <p className=" text-black">{result}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="outer-container" key={currentQuestionIndex}>
      {/* <div className="ambient-effects">
        <FaCloud className="ambient-icon ambient-cloud" />
        <FaWater className="ambient-icon ambient-wave" />
        <FaLeaf className="ambient-icon ambient-leaf" />
      </div> */}

      {/* <div className="question-progress">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div> */}

      <h1>{questions[currentQuestionIndex]}</h1>

      {questionInputTypes[currentQuestionIndex] === "number" || questionInputTypes[currentQuestionIndex] === "text" ? (
        <div className="input-wrapper">
          <input
            type={questionInputTypes[currentQuestionIndex]}
            className="custom-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            />
        </div>
      ) : (
        <div className="options-group9" >
          {options.map((opt) => (
            <label key={opt} className={`option-card ${answer === opt ? "selected" : ""}`}>
              <input
                type="radio"
                name="answer"
                value={opt}
                checked={answer === opt}
                onChange={handleAnswerChange}
                />
              <div className="option-content">
                {answerIcons[opt]}
                <h3>{opt}</h3>
              </div>
            </label>
          ))}
        </div>
      )}

      <button className="next-btn" onClick={handleNext}>
        {currentQuestionIndex === questions.length - 1 
          ? "Reveal Insights ✨" 
          : <><FaRegMoon /> Continue</>}
      </button>
    </div>
  );
}

export default MindWellQues;
