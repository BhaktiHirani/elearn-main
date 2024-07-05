import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { getDatabase, ref, get, set } from 'firebase/database';
import { CSSTransition } from 'react-transition-group';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificateTemplate from './certificate';
import './quiz.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../authprovider';

const QuizPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [userName, setUserName] = useState("John Doe"); // Replace with actual user's name
    const [courseName, setCourseName] = useState("");
    const [timeLeft, setTimeLeft] = useState(null); // Timer state
    const [showInstruction, setShowInstruction] = useState(true); // State to toggle between instruction and quiz
    const quizDuration = 5; // Duration in minutes (changed to 5 minutes)

    // Fetch quiz data
    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const quizRef = ref(db, `user/courses/${id}/quizzes/quizId1`);

            try {
                const snapshot = await get(quizRef);
                const data = snapshot.val();

                if (data) {
                    setQuizData(data);
                    setCourseName(data.courseName);
                } else {
                    console.log("No such quiz document!");
                    setQuizData(null);
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchData();
    }, [id]);

    // Start the timer when instructions are hidden and quiz data is available
    useEffect(() => {
        if (!showInstruction && quizData) {
            // Initialize the timer for 5 minutes (in milliseconds)
            setTimeLeft(quizDuration * 60 * 1000);

            // Start the timer countdown
            const interval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        handleSubmitQuiz();
                        return 0;
                    }
                    return prevTime - 1000; // Decrease the time by 1 second
                });
            }, 1000); // Update every 1 second

            return () => clearInterval(interval); // Cleanup on component unmount
        }
    }, [showInstruction, quizData]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const handleAnswerSelect = (questionId, selectedOptionId) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionId] = selectedOptionId;
        setAnswers(updatedAnswers);
    };

    const handleSubmitQuiz = async () => {
        const correct = quizData.questions.reduce((acc, question) => {
            const userAnswer = answers[question.id];
            if (userAnswer === question.correctAnswer) {
                return acc + 1;
            }
            return acc;
        }, 0);

        setCorrectAnswers(correct);
        setShowResults(true);

        // Update the quiz status in Firestore
        const db = getDatabase();
        const userQuizRef = ref(db, `Users/${currentUser.uid}/completedQuizzes/quizId1`);
        try {
            await set(userQuizRef, {
                quizId: 'quizId1',
                completed: true,
                correctAnswers: correct,
                totalQuestions: quizData.questions.length,
            });
        } catch (error) {
            console.error('Error updating quiz status:', error);
        }
    };

    const generateCertificate = () => {
        setShowCertificate(true);
    };

    if (!quizData) {
        return <div className="text-center mt-5">No quiz found for this ID.</div>;
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

    return (
        <Container className="py-5">
            <Card className="shadow-sm border-0">
                <Card.Body>
                    {showInstruction ? (
                        <div className="text-center">
                            <h2>Quiz Instructions</h2>
                            <p>Welcome to the {courseName} quiz!</p>
                            <p>You have 30 minutes to complete the quiz from the moment you start it. If you do not finish in time, the quiz will be automatically submitted.</p>
                            <Button onClick={() => setShowInstruction(false)} variant="primary">Start Quiz</Button>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-center mb-4">{courseName}</h3>
                            <CSSTransition
                                in={!showResults && !showCertificate}
                                timeout={300}
                                classNames="question"
                                unmountOnExit
                            >
                                <div>
                                    <Card.Title className="text-center">{currentQuestion.question}</Card.Title>
                                    {currentQuestion.image && (
                                        <div className="text-center mb-3">
                                            <img src={currentQuestion.image} alt="Question" className="img-fluid mb-2" />
                                        </div>
                                    )}
                                    <Form>
                                        {currentQuestion.options.map(option => (
                                            <Form.Check
                                                key={option.id}
                                                type="radio"
                                                id={option.id}
                                                label={option.text}
                                                name={`question${currentQuestion.id}`}
                                                value={option.id}
                                                checked={answers[currentQuestion.id] === option.id}
                                                onChange={() => handleAnswerSelect(currentQuestion.id, option.id)}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Form>
                                    <div className="d-flex justify-content-center mt-3">
                                        <div className="d-flex justify-content-between" style={{ width: '300px' }}>
                                            {currentQuestionIndex > 0 && (
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={handlePreviousQuestion}
                                                    style={{
                                                        backgroundColor: '#17bf9e',
                                                        borderColor: '#17bf9e',
                                                        color: '#fff'
                                                    }}
                                                >
                                                    Previous
                                                </Button>
                                            )}
                                            {currentQuestionIndex < quizData.questions.length - 1 && (
                                                <Button
                                                    variant="primary"
                                                    onClick={handleNextQuestion}
                                                    className="ms-2"
                                                    style={{
                                                        backgroundColor: '#17bf9e',
                                                        borderColor: '#17bf9e',
                                                        color: '#fff',
                                                        padding: '8px 16px',
                                                        fontSize: '14px',
                                                        width: '120px'
                                                    }}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                            {currentQuestionIndex === quizData.questions.length - 1 && (
                                                <Button
                                                    variant="success"
                                                    onClick={handleSubmitQuiz}
                                                    className="ms-2"
                                                    style={{
                                                        backgroundColor: '#17bf9e',
                                                        borderColor: '#17bf9e',
                                                        color: '#fff'
                                                    }}
                                                >
                                                    Submit Quiz
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <p>
                                            <strong>Time Left:</strong> {minutes}m {seconds}s
                                        </p>
                                    </div>
                                </div>
                            </CSSTransition>
    
                            <CSSTransition
                                in={showResults}
                                timeout={300}
                                classNames="results"
                                unmountOnExit
                            >
                                <div className="results text-center mt-4">
                                    <h3>Quiz Results</h3>
                                    <p>You got {correctAnswers} out of {quizData.questions.length} correct.</p>
                                    {!showCertificate && (
                                        <Button variant="info" onClick={generateCertificate} className="mt-3">
                                            Generate Certificate
                                        </Button>
                                    )}
                                </div>
                            </CSSTransition>
    
                            {showCertificate && (
                                <div className="certificate-download text-center mt-3">
                                    <PDFDownloadLink
                                        document={<CertificateTemplate name={userName} course={courseName} />}
                                        fileName="certificate.pdf"
                                    >
                                        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download Certificate')}
                                    </PDFDownloadLink>
                                </div>
                            )}
    
                            <div className="text-center mt-3">
                                <p><strong>Instructions:</strong> This quiz must be completed within {quizDuration} minutes.</p>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuizPage;
