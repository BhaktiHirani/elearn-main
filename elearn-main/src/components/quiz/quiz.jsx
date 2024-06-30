import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { getDatabase, ref, get} from 'firebase/database';
import { CSSTransition } from 'react-transition-group';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificateTemplate from './certificate';
import './quiz.css';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
    const { id } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showCertificate, setShowCertificate] = useState(false);
    const [userName, setUserName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [quizDuration, setQuizDuration] = useState(0);

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
                    setQuizDuration(data.quizDuration);
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

    const handleSubmitQuiz = () => {
        const correct = quizData.questions.reduce((acc, question) => {
            const userAnswer = answers[question.id];
            if (userAnswer === question.correctAnswer) {
                return acc + 1;
            }
            return acc;
        }, 0);

        setCorrectAnswers(correct);
        setShowResults(true);
    };

    const generateCertificate = () => {
        setUserName("John Doe"); // Replace with actual user's name
        setShowCertificate(true);
    };

    if (!quizData) {
        return <div className="text-center mt-5">No quiz found for this ID.</div>;
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <Container>
            <Card className="mt-4">
                <Card.Body>
                    <h3 className="mb-4">{courseName}</h3>
                    <CSSTransition
                        in={!showResults && !showCertificate}
                        timeout={300}
                        classNames="question"
                        unmountOnExit
                    >
                        <div>
                            <Card.Title>{currentQuestion.question}</Card.Title>
                            {currentQuestion.image && (
                                <img src={currentQuestion.image} alt="Question" className="img-fluid mb-2" />
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
                                    />
                                ))}
                            </Form>
                            <div>
                                {currentQuestionIndex > 0 && (
                                    <Button variant="secondary" onClick={handlePreviousQuestion}>
                                        Previous
                                    </Button>
                                )}
                                {currentQuestionIndex < quizData.questions.length - 1 && (
                                    <Button variant="primary" onClick={handleNextQuestion} className="ms-2">
                                        Next
                                    </Button>
                                )}
                                {currentQuestionIndex === quizData.questions.length - 1 && (
                                    <Button variant="success" onClick={handleSubmitQuiz} className="ms-2">
                                        Submit Quiz
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={showResults}
                        timeout={300}
                        classNames="results"
                        unmountOnExit
                    >
                        <div className="results">
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
                        <div className="certificate-download">
                            <PDFDownloadLink
                                document={<CertificateTemplate name={userName} course={courseName} />}
                                fileName="certificate.pdf"
                            >
                                {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download Certificate')}
                            </PDFDownloadLink>
                        </div>
                    )}

                    <div className="mt-3">
                        <p><strong>Instructions:</strong> This quiz must be completed within {quizDuration} minutes.</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuizPage;
