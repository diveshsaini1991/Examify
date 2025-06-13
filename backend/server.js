const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificate');
const cookieparser = require("cookie-parser");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
}));
app.use(cookieparser());
app.use(express.json());
app.use('/ping', (req, res) => {
    res.end("pong");
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/results', require('./routes/results'));
app.use('/api/certificate', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});