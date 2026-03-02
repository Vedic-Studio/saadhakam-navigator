const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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

// Helper function to get path description
const getPathDescription = (path) => {
  const descriptions = {
    inquiry: "Your spiritual path is one of deep inquiry and contemplation. You're naturally drawn to understanding the nature of reality, consciousness, and the self through philosophical exploration and self-inquiry.",
    devotion: "Your spiritual path is one of heart-centered devotion. You feel a natural love for the Divine and find meaning in worship, surrender, and sacred relationship.",
    ritual: "Your spiritual path honors tradition and sacred action. You find power in precise ritual performance, ceremony, and the structured observance of spiritual rites.",
    discipline: "Your spiritual path is one of methodical cultivation. You're drawn to systematic practice, training the mind and body through structured approaches.",
  };
  return descriptions[path] || '';
};

// Helper function to get path title
const getPathTitle = (path) => {
  const titles = {
    inquiry: "Inquiry-led Path",
    devotion: "Devotion-led Path",
    ritual: "Ritual-led Path",
    discipline: "Discipline-led Path",
  };
  return titles[path] || '';
};

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
  const pathTitle = getPathTitle(result.primaryPath);
  const pathDescription = getPathDescription(result.primaryPath);

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@opensadhaka.com',
    to: email,
    subject: 'Your Spiritual Path Results',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9f9f9; }
          .path-card { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .score-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0; }
          .score-item { background: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center; }
          .recommendations { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .cta { text-align: center; margin: 30px 0; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Spiritual Path</h1>
          </div>
          <div class="content">
            <h2>${pathTitle}</h2>
            <p>${pathDescription}</p>
            
            <div class="path-card">
              <h3>Your Scores</h3>
              <div class="score-grid">
                <div class="score-item">
                  <strong>Inquiry</strong><br>${result.scores.inquiry}
                </div>
                <div class="score-item">
                  <strong>Devotion</strong><br>${result.scores.devotion}
                </div>
                <div class="score-item">
                  <strong>Ritual</strong><br>${result.scores.ritual}
                </div>
                <div class="score-item">
                  <strong>Discipline</strong><br>${result.scores.discipline}
                </div>
              </div>
            </div>

            <div class="recommendations">
              <h3>Recommended Traditions</h3>
              <ul>
                ${result.recommendations.traditions.map(t => `<li>${t}</li>`).join('')}
              </ul>
              
              <h3>Recommended Practices</h3>
              <ul>
                ${result.recommendations.practices.map(p => `<li>${p}</li>`).join('')}
              </ul>
              
              <h3>Philosophies to Explore</h3>
              <ul>
                ${result.recommendations.philosophies.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>

            <div class="cta">
              <p>Over the next 30 days, we'll send you personalized guidance to help you begin your journey.</p>
              <a href="https://opensadhaka.com/faith-finder" class="button">View Full Results</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
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
  const nurtureDays = [1, 3, 7, 14, 30];

  nurtureDays.forEach(day => {
    setTimeout(() => {
      sendNurtureEmail(email, result, day);
    }, day * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  });
}

// Send nurture email
async function sendNurtureEmail(email, result, day) {
  const pathTitle = getPathTitle(result.primaryPath);

  let subject, content;

  switch (day) {
    case 1:
      subject = 'Day 1: Starting Your Spiritual Journey';
      content = `
        <h2>Welcome to Your Journey</h2>
        <p>Namaste! You've discovered that your path is the ${pathTitle}. Today, let's take the first step.</p>
        <h3>Your First Practice</h3>
        <p>Based on your path, we recommend starting with: <strong>${result.recommendations.practices[0]}</strong></p>
        <p>Set aside just 10 minutes today to try this practice. Don't worry about doing it perfectly—just begin.</p>
        <p><a href="https://opensadhaka.com/faith-finder">Learn more about your path</a></p>
      `;
      break;
    case 3:
      subject = 'Day 3: Deepening Your Practice';
      content = `
        <h2>Three Days In</h2>
        <p>How has your first practice been? Remember, consistency matters more than intensity.</p>
        <h3>Expanding Your Understanding</h3>
        <p>Today, learn about one of the traditions aligned with your path: <strong>${result.recommendations.traditions[0]}</strong></p>
        <p>Understanding the context of your practice helps deepen your experience.</p>
      `;
      break;
    case 7:
      subject = 'Day 7: One Week of Practice';
      content = `
        <h2>One Week Complete!</h2>
        <p>Congratulations on completing your first week. This is significant progress.</p>
        <h3>Reflecting on Your Journey</h3>
        <p>Take some time today to reflect on your experiences over the past week:</p>
        <ul>
          <li>What felt natural?</li>
          <li>What felt challenging?</li>
          <li>What would you like to explore further?</li>
        </ul>
        <p>Consider adding a second practice: <strong>${result.recommendations.practices[1] || 'Meditation'}</strong></p>
      `;
      break;
    case 14:
      subject = 'Day 14: Two Weeks of Growth';
      content = `
        <h2>Two Weeks Down</h2>
        <p>You're building momentum! Your ${pathTitle} is becoming more familiar.</p>
        <h3>Going Deeper</h3>
        <p>At this stage, consider exploring the philosophy behind your practice:</p>
        <p><strong>${result.recommendations.philosophies[0]}</strong></p>
        <p>Understanding the 'why' behind your practice can transform it from routine to revelation.</p>
      `;
      break;
    case 30:
      subject = 'Day 30: One Month of Spiritual Practice';
      content = `
        <h2>One Month Complete!</h2>
        <p>You've established a spiritual practice. This is a meaningful achievement.</p>
        <h3>Your Journey Ahead</h3>
        <p>The ${pathTitle} is not a destination—it's a way of being. Continue with your practices, stay curious, and trust your journey.</p>
        <h3>Next Steps</h3>
        <ul>
          <li>Continue your daily practice</li>
          <li>Explore more traditions and practices</li>
          <li>Connect with a community or teacher</li>
          <li>Consider deepening your study of ${result.recommendations.philosophies[0]}</li>
        </ul>
        <p><a href="https://opensadhaka.com">Explore more on Sadhaka</a></p>
      `;
      break;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@opensadhaka.com',
    to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f9f9f9; }
          .day-badge { display: inline-block; background: #667eea; color: white; padding: 5px 15px; border-radius: 20px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Spiritual Journey</h1>
          </div>
          <div class="content">
            <span class="day-badge">Day ${day}</span>
            ${content}
            <p style="margin-top: 30px; text-align: center;">
              <a href="https://opensadhaka.com/faith-finder" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px;">View Your Results</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Day ${day} nurture email sent to:`, email);
  } catch (error) {
    console.error(`Error sending Day ${day} nurture email:`, error);
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
