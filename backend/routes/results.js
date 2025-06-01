const express = require('express');
const {getResults} = require("../controllers/examController")
const { generateCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getResults);
router.get('/certificate/:resultId', protect, generateCertificate);

module.exports = router;