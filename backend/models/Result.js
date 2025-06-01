const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam', 
        required: true
    },
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
});

module.exports = mongoose.model('Result', resultSchema);