// this page will be used to ask the user a question and get their response
import React from "react";
import axios from "axios";
import { useState , useEffect } from "react";

function MindWellQues() {
    const questions = [
        "How are you feeling today?",
        "What is one thing you're grateful for?",
        "Did you face any challenges today?",
        "What made you smile today?",
        "Is there something you want to improve tomorrow?"
    ];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [question, setQuestion] = useState(questions[currentQuestionIndex]);
    const [answer, setAnswer] = useState("");

    React.useEffect(() => {
        setQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex]);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleNext = () => {
        // Here you can save the answer to a file or send to API later
        // For now, just move to next question
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswer("");
        } else {
            // All questions answered
            setQuestion("Thank you for your responses!");
        }
    };
    // temporary assign question


    return <>
        <div className="question-container">
            <h2>{question}</h2>
            <input
                type="text"
                value={answer}
                onChange={handleAnswerChange}
                placeholder="Your answer"
            />
            <button onClick={handleNext}>Next</button>
        </div>
    </>
}
export default MindWellQues;
