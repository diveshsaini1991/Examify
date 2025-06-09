import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const role = localStorage.getItem('role');
    
    useEffect(() => {
        fetchExams();
    }, []);
    
    const fetchExams = async () => {
        try {
            setLoading(true);
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(VITE_BACKEND_URL + '/api/exams', {
                withCredentials: true
            });
            setExams(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching exams', error);
            setError('Failed to load exams. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDeleteExam = async (examId) => {
        if (!window.confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
            return;
        }
        
        setDeleteLoading(examId);
        
        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.delete(VITE_BACKEND_URL + `/api/exams/delete/${examId}`, {
                withCredentials: true
            });
            
            // Remove the deleted exam from state
            setExams(exams.filter(exam => exam._id !== examId));
        } catch (error) {
            console.error('Error deleting exam', error);
            alert('Failed to delete exam. Please try again.');
        } finally {
            setDeleteLoading(null);
        }
    };
    
    const getMessageForEmptyExams = () => {
        if (role === 'examiner') {
            return "You haven't created any exams yet.";
        } else {
            return "You've completed all available exams! Check your results page to see how you did.";
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    {role === 'examiner' ? 'Your Created Exams' : 'Available Exams'}
                </h1>
                
                {role === 'examiner' && (
                    <Link to="/create-exam">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                            Create New Exam
                        </button>
                    </Link>
                )}
            </div>
            
            {loading ? (
                <div className="flex justify-center p-8">
                    <p className="text-gray-600">Loading exams...</p>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <p>{error}</p>
                </div>
            ) : exams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exams.map((exam) => (
                        <div key={exam._id} className="border border-gray-300 p-5 rounded-lg bg-white shadow-sm hover:shadow-md transition">
                            <h2 className="font-semibold text-xl mb-2">{exam.title}</h2>
                            <p className="text-gray-600 mb-3">{exam.questions.length} Questions</p>
                            
                            <div className="flex space-x-2">
                                <Link to={`/exam/${exam._id}`} className="flex-1">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
                                        {role === 'examiner' ? 'View Exam' : 'Take Exam'}
                                    </button>
                                </Link>
                                
                                {role === 'examiner' && (
                                    <button 
                                        onClick={() => handleDeleteExam(exam._id)}
                                        disabled={deleteLoading === exam._id}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition disabled:bg-red-400"
                                    >
                                        {deleteLoading === exam._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 mb-4">{getMessageForEmptyExams()}</p>
                    
                    {role === 'examiner' ? (
                        <Link to="/create-exam">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                                Create Your First Exam
                            </button>
                        </Link>
                    ) : (
                        <Link to="/results">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                                View Your Results
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;