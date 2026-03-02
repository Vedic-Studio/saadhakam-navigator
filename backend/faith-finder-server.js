const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const emailContent = require('./email-content');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store quiz submissions (in production, use a database)
const quizSubmissions = new Map();

// Email configuration (in production, use environment variables)
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
  },
};

// Create email transporter
const transporter = nodemailer.createTransport(emailConfig);

// Helper functions delegated to email-content module
const getPathDescription = emailContent.getPathDescription;
const getPathTitle = emailContent.getPathTitle;

// API: Submit quiz and get results
app.post('/api/faith-finder/submit', async (req, res) => {
  try {
    const { email, result } = req.body;

    if (!email || !result) {
      return res.status(400).json({ error: 'Email and result are required' });
    }

    // Store submission
    const submissionId = Date.now().toString();
    quizSubmissions.set(submissionId, {
      email,
      result,
      timestamp: new Date().toISOString(),
    });

    // Send immediate email
    await sendImmediateEmail(email, result);

    // Schedule nurture sequence emails (in production, use a job queue)
    scheduleNurtureEmails(email, result, submissionId);

    res.json({
      success: true,
      submissionId,
      message: 'Quiz submitted successfully. Check your email for your complete report.',
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// API: Get quiz questions
app.get('/api/faith-finder/questions', (req, res) => {
  const questionsPath = path.join(__dirname, '../src/data/faithFinderQuiz.ts');

  // For now, return a simple structure
  res.json({
    questions: quizQuestions || [],
  });
});

// API: Get quiz result by ID
app.get('/api/faith-finder/result/:id', (req, res) => {
  const { id } = req.params;
  const submission = quizSubmissions.get(id);

  if (!submission) {
    return res.status(404).json({ error: 'Result not found' });
  }

  res.json(submission);
});

// Email: Immediate result email
async function sendImmediateEmail(email, result) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@opensadhaka.com',
    to: email,
    subject: emailContent.getSubject(0, result.primaryPath),
    html: emailContent.buildEmail(0, result),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Immediate email sent to:', email);
  } catch (error) {
    console.error('Error sending immediate email:', error);
  }
}

// Schedule nurture emails
function scheduleNurtureEmails(email, result, submissionId) {
  // emailIndex: 1=Day1, 2=Day3, 3=Day7, 4=Day14, 5=Day30
  const schedule = [
    { emailIndex: 1, delayMs: 1  * 24 * 60 * 60 * 1000 },
    { emailIndex: 2, delayMs: 3  * 24 * 60 * 60 * 1000 },
    { emailIndex: 3, delayMs: 7  * 24 * 60 * 60 * 1000 },
    { emailIndex: 4, delayMs: 14 * 24 * 60 * 60 * 1000 },
    { emailIndex: 5, delayMs: 30 * 24 * 60 * 60 * 1000 },
  ];

  schedule.forEach(({ emailIndex, delayMs }) => {
    setTimeout(() => sendNurtureEmail(email, result, emailIndex), delayMs);
  });
}

// Send a single nurture email (emailIndex 1–5)
async function sendNurtureEmail(email, result, emailIndex) {
  const html = emailContent.buildEmail(emailIndex, result);
  if (!html) {
    console.error(`No template for emailIndex ${emailIndex}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@opensadhaka.com',
    to: email,
    subject: emailContent.getSubject(emailIndex, result.primaryPath),
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email ${emailIndex} sent to: ${email}`);
  } catch (error) {
    console.error(`Error sending email ${emailIndex}:`, error);
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Faith Finder server running on port ${PORT}`);
});

module.exports = app;
