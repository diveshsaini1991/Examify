const Exam = require('../models/Exam');
const Result = require('../models/Result');
const mongoose = require('mongoose');

exports.createExam = async (req, res) => {
    const exam = new Exam({ ...req.body, createdBy: req.user.id });
    try {
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExams = async (req, res) => {
    try {
        if (req.user.role === 'examiner') {
            const exams = await Exam.find({ createdBy: req.user.id });
            return res.json(exams);
        } else {
            
            const completedExams = await Result.find({ user: req.user.id })
                .select('exam')
                .lean();
                
            const completedExamIds = completedExams.map(result => result.exam);
            
            const availableExams = await Exam.find({
                _id: { $nin: completedExamIds }
            });
            
            return res.json(availableExams);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        if (req.user.role === 'student') {
            const alreadyTaken = await Result.findOne({
                user: req.user.id,
                exam: req.params.id
            });
            
            if (alreadyTaken) {
                return res.status(403).json({ 
                    message: 'You have already completed this exam',
                    result: alreadyTaken
                });
            }
        }
        
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitExam = async (req, res) => {
    try {
        const { examId, answers } = req.body;
        
        const existingResult = await Result.findOne({
            user: req.user.id,
            exam: examId
        });
        
        if (existingResult) {
            return res.status(400).json({ 
                message: 'You have already submitted this exam',
                result: existingResult
            });
        }
        
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        let score = 0;
        exam.questions.forEach((question, index) => {
            if (question.answer === answers[index]) {
                score++;
            }
        });
        
        const passed = score >= (exam.questions.length / 2);
        const result = new Result({ 
            user: req.user.id, 
            exam: examId, 
            score, 
            passed 
        });
        
        await result.save();
        res.json({ score, passed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user.id })
            .populate('exam')
            .sort({ completedAt: -1 });
            
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllExams = async (req, res) => {
    try {
        if (req.user.role !== 'examiner') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete exam by id
exports.deleteExam = async (req, res) => {
    try {
        if (req.user.role !== 'examiner') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};