import React from 'react';
import { Link } from 'react-router-dom';

const QuizPage = ({ quiz }) => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">{quiz.title}</h1>
      <div className="text-center mb-4">
        <p>Instructor: {quiz.instructor}</p>
        <p>Time Limit: {quiz.timeLimit} minutes</p>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-primary">
          Start Quiz
        </button>
      </div>
      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `50%` }} // For demonstration purposes, assuming 50% progress
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          1 / 2
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">What is the capital of France?</h5>
          {/* Assuming an example image for the question media */}
          <img src="https://example.com/question-image.jpg" alt="Question Media" className="img-fluid mb-3" />
          <input
            type="text"
            className="form-control"
            placeholder="Your answer"
          />
          <div className="mt-3 d-flex justify-content-between">
            <button className="btn btn-secondary me-2">
              Next Question
            </button>
            <button className="btn btn-success">
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
