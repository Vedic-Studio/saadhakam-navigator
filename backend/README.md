# Sadhaka Faith Finder Backend

Backend API for the Sadhaka Faith Finder Quiz.

## Features

- Quiz submission endpoint
- Scoring algorithm
- Results generation
- Email integration with nurture sequence
- Email templates for immediate, Day 1, Day 3, Day 7, Day 14, and Day 30 emails

## Installation

```bash
cd backend
npm install
```

## Configuration

Create a `.env` file in the backend directory:

```env
# Server
PORT=3001

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@sadhaka.com
```

For Gmail, you'll need to create an App Password:
1. Go to Google Account settings
2. Enable 2-Step Verification
3. Create an App Password for mail
4. Use the App Password in SMTP_PASS

## Running the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### POST /api/faith-finder/submit

Submit quiz answers and receive results.

**Request Body:**
```json
{
  "email": "user@example.com",
  "result": {
    "primaryPath": "inquiry",
    "secondaryPath": "discipline",
    "scores": {
      "inquiry": 12,
      "devotion": 3,
      "ritual": 5,
      "discipline": 8
    },
    "recommendations": {
      "traditions": ["Advaita Vedanta", "Nyaya", "Samkhya"],
      "practices": ["Self-inquiry", "Study", "Meditation"],
      "philosophies": ["Advaita Vedanta", "Vedanta", "Samkhya"]
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "submissionId": "1234567890",
  "message": "Quiz submitted successfully. Check your email for your complete report."
}
```

### GET /api/faith-finder/questions

Get quiz questions.

**Response:**
```json
{
  "questions": [...]
}
```

### GET /api/faith-finder/result/:id

Get quiz result by submission ID.

**Response:**
```json
{
  "email": "user@example.com",
  "result": {...},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Email Sequence

The backend sends a series of nurture emails:

1. **Immediate**: Full quiz results with personalized recommendations
2. **Day 1**: First practice recommendation
3. **Day 3**: Deepening practice with tradition exploration
4. **Day 7**: One week reflection and second practice
5. **Day 14**: Two weeks progress and philosophy exploration
6. **Day 30**: One month celebration and next steps

## Development Notes

- Quiz submissions are stored in memory (Map). In production, use a database.
- Email scheduling uses setTimeout. In production, use a job queue like Bull or Agenda.
- Email templates are inline HTML. Consider using a template engine like Handlebars or EJS.

## Frontend Integration

The frontend is configured to proxy API requests to the backend:

```javascript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

This allows the frontend to make requests to `/api/faith-finder/submit` which will be proxied to `http://localhost:3001/api/faith-finder/submit`.
