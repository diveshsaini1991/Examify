const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Result = require('../models/Result');

exports.generateCertificate = async (req, res) => {
    const { resultId } = req.params;
    try {
        const result = await Result.findById(resultId)
            .populate({
                path: 'exam',
                populate: {
                    path: 'createdBy',
                    select: 'firstName lastName'
                }
            })
            .populate('user');
            
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        
        if (!result.user || !result.user.username) {
            return res.status(400).json({ message: 'User information is missing in the result.' });
        }
        
        // Extract user information
        const username = result.user.username;
        const name = username.split('@')[0]
            .split('.')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
        // Format date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
        });
        
        // Get teacher username
        const teacherName = result.exam.createdBy && result.exam.createdBy.username ? 
            result.exam.createdBy.username : 
            'Authorized Instructor';
        
        // Create PDF document with single page
        const doc = new PDFDocument({
            size: [842, 595], // A4 landscape size in points
            autoFirstPage: true,
            margin: 0 // No margins, we'll control spacing manually
        });
        
        // Setup response headers
        const filename = `certificate-${resultId}.pdf`;
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);
        
        // Document dimensions
        const pageWidth = 842;
        const pageHeight = 595;
        
        // Draw outer border (blue)
        doc.rect(30, 30, pageWidth - 60, pageHeight - 60)
           .lineWidth(3)
           .stroke('#1e3a8a');
        
        // Draw inner border (lighter blue)
        doc.rect(50, 50, pageWidth - 100, pageHeight - 100)
           .lineWidth(1)
           .stroke('#3b82f6');
        
        // Content area dimensions
        const contentX = 70;
        const contentY = 80;
        const contentWidth = pageWidth - 140;
        const contentHeight = pageHeight - 160;
        
        // Certificate title
        doc.font('Helvetica-Bold')
           .fontSize(36)
           .fillColor('#1e3a8a')
           .text('Certificate of Achievement', contentX, contentY, {
               align: 'center',
               width: contentWidth
           });
        
        // Recipient intro
        doc.font('Helvetica')
           .fontSize(18)
           .fillColor('#000')
           .text('This certifies that', contentX, contentY + 60, {
               align: 'center',
               width: contentWidth
           });
        
        // Recipient name
        doc.font('Helvetica-Bold')
           .fontSize(28)
           .fillColor('#1e3a8a')
           .text(name, contentX, contentY + 90, {
               align: 'center',
               width: contentWidth
           });
        
        // Exam completion text
        doc.font('Helvetica')
           .fontSize(18)
           .fillColor('#000')
           .text('has successfully completed the exam:', contentX, contentY + 140, {
               align: 'center',
               width: contentWidth
           });
        
        // Exam title
        const examTitle = result.exam.title.length > 60 
            ? result.exam.title.substring(0, 57) + '...' 
            : result.exam.title;
            
        doc.font('Helvetica-Bold')
           .fontSize(24)
           .fillColor('#1e3a8a')
           .text(examTitle, contentX, contentY + 170, {
               align: 'center',
               width: contentWidth
           });
        
        
        // Status with color
        const statusColor = result.passed ? '#059669' : '#dc2626';
        doc.font('Helvetica-Bold')
           .fontSize(18)
           .fillColor(statusColor)
           .text(`Status: ${result.passed ? 'PASSED' : 'FAILED'}`, contentX, contentY + 250, {
               align: 'center',
               width: contentWidth
           });
        
        // Issue date
        doc.font('Helvetica')
           .fontSize(14)
           .fillColor('#000')
           .text(`Issued on: ${formattedDate}`, contentX, contentY + 290, {
               align: 'center',
               width: contentWidth
           });
        
        // Signature line and teacher name
        const signatureY = contentY + 340;
        
        // Draw a simple signature line
        doc.moveTo(pageWidth/2 - 100, signatureY)
           .lineTo(pageWidth/2 + 100, signatureY)
           .lineWidth(1)
           .stroke('#000');
        
        // Add instructor username
        doc.font('Helvetica-Bold')
           .fontSize(12)
           .fillColor('#000')
           .text(teacherName, contentX, signatureY + 15, {
               align: 'center',
               width: contentWidth
           });
        
        doc.font('Helvetica')
           .fontSize(10)
           .fillColor('#555')
           .text('Exam Instructor', contentX, signatureY + 30, {
               align: 'center',
               width: contentWidth
           });
        
        // Certificate ID (bottom right, inside border)
        doc.font('Helvetica')
           .fontSize(10)
           .fillColor('#555')
           .text(`Certificate ID: ${resultId}`, contentX, pageHeight - 70, {
               align: 'right',
               width: contentWidth
           });
           
        // Digital verification text
        doc.font('Helvetica-Oblique')
           .fontSize(8)
           .fillColor('#555')
           .text(`This certificate is issued by ${teacherName}`, 
               contentX, pageHeight - 55, {
               align: 'center',
               width: contentWidth
           });
        
        // End the document
        doc.end();
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ message: 'Server error' });
    }
};