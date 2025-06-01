import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Exam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState('');
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [showFullscreenPopup, setShowFullscreenPopup] = useState(false);
    const [showEndExamPopup, setShowEndExamPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const role = localStorage.getItem('role');
    const examContainerRef = useRef(null);
    const autoSubmitLock = useRef(false);
    
    // Check if browser is in fullscreen
    const isFullscreen = () => {
        return document.fullscreenElement || 
               document.webkitFullscreenElement || 
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    };

    // Request fullscreen
    const requestFullscreen = () => {
        const element = examContainerRef.current;
        if (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    };

    // Handle visibility change (tab switch)
    const handleVisibilityChange = () => {
        if (document.hidden && !hasSubmitted && !autoSubmitLock.current) {
            incrementTabSwitchCount();
        }
    };

    // Increment tab switch count and handle auto-submit
    const incrementTabSwitchCount = () => {
        setTabSwitchCount(prev => {
            const newCount = prev + 1;
            if (newCount >= 5 && !hasSubmitted && !autoSubmitLock.current) {
                handleAutoSubmit();
            }
            return newCount;
        });
    };

    // Handle auto-submit when limit is reached
    const handleAutoSubmit = async () => {
        if (hasSubmitted || isSubmitting || autoSubmitLock.current) return;
        
        autoSubmitLock.current = true;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/exams/submit', 
                { examId: id, answers }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setHasSubmitted(true);
            setShowEndExamPopup(true);
        } catch (error) {
            console.error('Error auto-submitting exam:', error);
            if (error.response?.data?.message?.includes('already submitted')) {
                setHasSubmitted(true);
                setShowEndExamPopup(true);
            } else {
                alert('Error submitting exam. Please contact your instructor.' + error);
            }
        } finally {
            setIsSubmitting(false);
            autoSubmitLock.current = false;
        }
    };

    // Check fullscreen periodically
    const checkFullscreen = () => {
        if (!isFullscreen() && !hasSubmitted && !autoSubmitLock.current) {
            setShowFullscreenPopup(true);
            incrementTabSwitchCount();
            setWarning(`Warning: Fullscreen mode is required for this exam! (${tabSwitchCount + 1}/5)`);
        } else {
            setShowFullscreenPopup(false);
            setWarning('');
        }
    };

    useEffect(() => {
        const fetchExam = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/exams/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                setExam(response.data);
                setAnswers(Array(response.data.questions.length).fill(''));
                setError(null);

                // Request fullscreen when exam starts
                requestFullscreen();
                
                // Set up event listeners
                document.addEventListener('visibilitychange', handleVisibilityChange);
                document.addEventListener('fullscreenchange', checkFullscreen);
                document.addEventListener('webkitfullscreenchange', checkFullscreen);
                document.addEventListener('mozfullscreenchange', checkFullscreen);
                document.addEventListener('MSFullscreenChange', checkFullscreen);


                return () => {
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    document.removeEventListener('fullscreenchange', checkFullscreen);
                    document.removeEventListener('webkitfullscreenchange', checkFullscreen);
                    document.removeEventListener('mozfullscreenchange', checkFullscreen);
                    document.removeEventListener('MSFullscreenChange', checkFullscreen);
                    clearInterval(fullscreenCheckInterval);
                };
            } catch (err) {
                console.error('Error fetching exam:', err);
                if (err.response && err.response.status === 403) {
                    setError(err.response.data.message);
                    setTimeout(() => {
                        navigate('/results');
                    }, 3000);
                } else {
                    setError('Failed to load exam. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchExam();
    }, [id, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hasSubmitted || isSubmitting || autoSubmitLock.current) return;
        
        autoSubmitLock.current = true;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/exams/submit', 
                { examId: id, answers }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setHasSubmitted(true);
            setShowEndExamPopup(true);
        } catch (error) {
            console.error('Error submitting exam:', error);
            if (error.response?.data?.message?.includes('already submitted')) {
                setHasSubmitted(true);
                setShowEndExamPopup(true);
            } else {
                alert('Error submitting exam. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
            autoSubmitLock.current = false;
        }
    };
    
    if (loading) {
        return <div className="text-center py-8">Loading exam...</div>;
    }
    
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                <p>{error}</p>
                <p className="mt-2">Redirecting to your results page...</p>
            </div>
        );
    }
    
    return (
        <div className="h-screen overflow-auto" ref={examContainerRef}>
            {warning && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 sticky top-0 z-10">
                    <p>{warning}</p>
                </div>
            )}
            
            {showFullscreenPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Fullscreen Required</h2>
                        <p className="text-gray-700 mb-2">
                            You must be in fullscreen mode to continue the exam.
                        </p>
                        <p className="text-gray-700 mb-6">
                            Warning Count: {tabSwitchCount}/5
                        </p>
                        <button
                            onClick={requestFullscreen}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
                        >
                            Enter Fullscreen Mode
                        </button>
                    </div>
                </div>
            )}

            {showEndExamPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">
                            {tabSwitchCount >= 5 ? 'Exam Ended' : 'Exam Submitted'}
                        </h2>
                        <p className="text-gray-700 mb-6">
                            {tabSwitchCount >= 5 
                                ? 'Your exam has been automatically submitted due to multiple warnings.'
                                : 'Your exam has been successfully submitted.'
                            }
                            You can view your results by clicking the button below.
                        </p>
                        <button
                            onClick={() => navigate('/results')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition"
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}
            
            <div className="container mx-auto px-4 py-6">
                {exam && (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2">
                            <h2 className="text-xl font-bold">{exam.title}</h2>
                            <div className="text-sm text-gray-600">
                                Warning Count: {tabSwitchCount}/5
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {exam.questions.map((question, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded">
                                    <p className="font-semibold">{question.question}</p>
                                    <div className="mt-3 space-y-2">
                                        {question.options.map((option, optionIndex) => (
                                            <label key={optionIndex} className="block ml-2 flex items-start">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    checked={answers[index] === option}
                                                    onChange={() => {
                                                        const newAnswers = [...answers];
                                                        newAnswers[index] = option;
                                                        setAnswers(newAnswers);
                                                    }}
                                                    className="mr-2 mt-1"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 sticky bottom-0 bg-white py-4">
                            {role === 'student' && !hasSubmitted ? (
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                                </button>
                            ) : (
                                <p>Author cannot Attempt</p>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Exam;