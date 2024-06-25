import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
  const location = useLocation();
  const { userName, userEmail, courseId } = location.state || {};

  // Mock quiz data for demonstration purposes
  const quiz = {
    title: "Sample Quiz",
    instructor: "John Doe",
    timeLimit: 30,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        image: "https://www.hdwallpapers10.com/wp-content/uploads/2017/05/paris%20france%20eiffel%20tower%20beautiful%20amazing%20images%20full%20hd.jpg",
        options: [
          { id: 'a', text: 'Paris' },
          { id: 'b', text: 'London' },
          { id: 'c', text: 'Berlin' },
          { id: 'd', text: 'Madrid' }
        ],
        correctAnswer: 'a'
      },
      {
        id: 2,
        question: "Who painted the Mona Lisa?",
        options: [
          { id: 'a', text: 'Vincent van Gogh' },
          { id: 'b', text: 'Leonardo da Vinci' },
          { id: 'c', text: 'Pablo Picasso' },
          { id: 'd', text: 'Michelangelo' }
        ],
        correctAnswer: 'b'
      }
    ]
  };

  // State to track current question, selected answers, and quiz completion
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Function to handle selecting an answer
  const handleSelectAnswer = (questionId, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId
    });
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // If last question, mark quiz as completed
      setQuizCompleted(true);
    }
  };

  // Function to handle quiz submission
  const handleSubmitQuiz = () => {
    // Logic for submitting quiz, e.g., sending answers to backend
    console.log("Quiz submitted:", selectedAnswers);
    // Optionally, navigate to result page or display feedback
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">{quiz.title}</h1>
      <div className="text-center mb-4">
        <p className="mb-2">Instructor: {quiz.instructor}</p>
        <p>Time Limit: {quiz.timeLimit} minutes</p>
      </div>

      {/* Quiz questions */}
      {quiz.questions.map((question, index) => (
        <div key={question.id} className={`card mb-4 ${index === currentQuestion ? 'd-block' : 'd-none'}`}>
          <div className="card-body">
            <h5 className="card-title mb-4">{question.question}</h5>
            {question.image && (
              <img src={question.image} alt="Question Media" className="img-fluid mb-1" width="20%" height="20%" />
            )}
            <div className="form-check">
              {question.options.map(option => (
                <div key={option.id} className="form-check mb-2">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    id={`option_${option.id}`} 
                    name={`question_${question.id}`} 
                    value={option.id}
                    checked={selectedAnswers[question.id] === option.id}
                    onChange={() => handleSelectAnswer(question.id, option.id)}
                    disabled={quizCompleted} // Disable input when quiz is completed
                  />
                  <label className="form-check-label" htmlFor={`option_${option.id}`}>
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
            {!quizCompleted && (
              <div className="mt-4 d-flex justify-content-end">
                <button 
                  className="btn btn-primary me-2"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[question.id]} // Disable if no answer selected
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Quiz completion message and submit button */}
      {quizCompleted && (
        <div className="card mb-4">
          <div className="card-body text-center">
            <h5 className="card-title">Quiz Completed!</h5>
            <p className="card-text">You have completed all questions.</p>
            <button 
              className="btn btn-success"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          aria-valuenow={((currentQuestion + 1) / quiz.questions.length) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {currentQuestion + 1} / {quiz.questions.length}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
