import React, { useState } from 'react';
import axios from 'axios';

const CreateExam = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
    };

    const handleChangeQuestion = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleChangeOption = (index, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleChangeAnswer = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/exams', { title, questions }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        window.location.href = '/dashboard';
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create Exam</h2>
            <input
                type="text"
                placeholder="Exam Title"
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full"
                required
            />
            {questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <input
                        type="text"
                        placeholder="Question"
                        onChange={(e) => handleChangeQuestion(index, e.target.value)}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        required
                    />
                    {q.options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            onChange={(e) => handleChangeOption(index, optionIndex, e.target.value)}
                            className="border border-gray-300 p-2 mb-2 w-full"
                            required
                        />
                    ))}
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        onChange={(e) => handleChangeAnswer(index, e.target.value)}
                        className="border border-gray-300 p-2 mb-2 w-full"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addQuestion} className="bg-blue-600 text-white mr-4 p-2 rounded mb-4">Add Question</button>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">Create Exam</button>
        </form>
    );
};

export default CreateExam;