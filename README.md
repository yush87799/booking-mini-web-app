# Court Booking Application

A modern, full-stack booking application for courts and turfs built with Next.js and Node.js/Express. This application allows users to view available time slots in a calendar view and book them seamlessly with real-time updates.

![Court Booking App](https://img.shields.io/badge/Status-Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)

## 📖 Project Overview

This is a full-stack court booking system designed for sports facilities. The application features:

- **Interactive Calendar View**: Visual calendar interface showing available slots grouped by date
- **Real-time Booking**: Instant slot booking with immediate visual feedback
- **Smart Slot Management**: Automatically generates slots for the next 30 days (excluding Mondays for maintenance)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **RESTful API**: Well-documented API with OpenAPI 3.0 specification

### Key Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and gradient backgrounds
- **Mobile-First**: Fully responsive design optimized for mobile and desktop
- **Real-time Booking**: Instant slot booking with visual feedback and loading states
- **Date Grouping**: Slots organized by date for better user experience
- **Error Handling**: Comprehensive error handling and user feedback
- **Calendar Navigation**: Month-by-month navigation with visual indicators
- **Slot Availability**: Real-time display of available vs booked slots
- **Business Rules**: Mondays are closed for maintenance, past dates are disabled

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework for server-side rendering and routing |
| **React** | 19.2.3 | UI library for building interactive components |
| **React DOM** | 19.2.3 | DOM rendering for React |
| **TypeScript** | ^5.0 | Type-safe JavaScript for better development experience |
| **Tailwind CSS** | ^4.0 | Utility-first CSS framework for styling |
| **@tailwindcss/postcss** | ^4 | PostCSS plugin for Tailwind CSS |
| **ESLint** | ^9 | Code linting and quality assurance |
| **eslint-config-next** | 16.1.1 | Next.js-specific ESLint configuration |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | JavaScript runtime environment |
| **Express.js** | 5.2.1 | Web application framework for Node.js |
| **CORS** | ^2.8.5 | Cross-Origin Resource Sharing middleware |
| **nanoid** | ^5.1.6 | Unique ID generation for slots |
| **nodemon** | ^3.1.11 | Development tool for auto-restarting server (dev dependency) |

### Data Storage

- **JSON File-based Storage**: Simple file-based database using `slots.json`
- **Easy Migration**: Can be easily migrated to MongoDB, PostgreSQL, or any other database

### API Documentation

- **OpenAPI 3.0**: RESTful API specification for documentation and testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **npm** (comes with Node.js) or **yarn**
   - npm is included with Node.js installation
   - Verify: `npm --version`

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/
   - Verify: `git --version`

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space
- **Internet Connection**: Required for installing dependencies

## 🚀 Setup Instructions

Follow these step-by-step instructions to set up the project on any PC:

### Step 1: Clone or Download the Repository

**Option A: Using Git (Recommended)**
```bash
git clone <repository-url>
cd mini-booking-app
```

**Option B: Download ZIP**
1. Download the repository as a ZIP file
2. Extract it to your desired location
3. Open terminal/command prompt in the extracted folder

### Step 2: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`:
   - express
   - cors
   - nanoid
   - nodemon (dev dependency)

3. **Verify the installation:**
   - Check that `node_modules` folder is created
   - Verify `slots.json` exists in `src/` directory

4. **Start the backend server:**
   
   **For Development (with auto-reload):**
   ```bash
   npm run dev
   ```
   
   **For Production:**
   ```bash
   npm start
   ```

5. **Verify backend is running:**
   - You should see: `🚀 Court Booking API running on port 5000`
   - Open browser and visit: `http://localhost:5000/health`
   - You should see: `{"ok":true}`

### Step 3: Frontend Setup

**Open a NEW terminal/command prompt window** (keep the backend running):

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend/mini-booking-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages:
   - next
   - react
   - react-dom
   - typescript
   - tailwindcss
   - And other dev dependencies

3. **Create environment file:**
   
   Create a file named `.env.local` in the `frontend/mini-booking-app/` directory:
   
   **Windows (PowerShell):**
   ```powershell
   New-Item -Path .env.local -ItemType File
   ```
   
   **Windows (Command Prompt):**
   ```cmd
   type nul > .env.local
   ```
   
   **macOS/Linux:**
   ```bash
   touch .env.local
   ```
   
   Add the following content to `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

5. **Verify frontend is running:**
   - You should see: `Ready on http://localhost:3000`
   - Open browser and visit: `http://localhost:3000`

### Step 4: Access the Application

Once both servers are running:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **OpenAPI Documentation**: http://localhost:5000/api/openapi.json

### Troubleshooting Setup Issues

**Issue: Port already in use**
- Backend: Change port in `backend/src/server.js` or set `PORT` environment variable
- Frontend: Change port by running `npm run dev -- -p 3001`

**Issue: npm install fails**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check Node.js version: `node --version` (should be v18+)

**Issue: Frontend can't connect to backend**
- Verify backend is running on port 5000
- Check `.env.local` file exists and has correct URL
- Restart frontend server after creating `.env.local`

**Issue: TypeScript errors**
- Run `npm install` again to ensure all types are installed
- Check that `tsconfig.json` exists in frontend directory

## 📁 Project Structure

```
mini-booking-app/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server setup and route handlers
│   │   ├── store.js           # Data access layer (read/write slots.json)
│   │   ├── slots.json         # JSON database (auto-generated)
│   │   └── openapi.json       # OpenAPI 3.0 API documentation
│   ├── node_modules/          # Backend dependencies (auto-generated)
│   ├── package.json           # Backend dependencies and scripts
│   └── package-lock.json      # Locked dependency versions
│
├── frontend/
│   └── mini-booking-app/
│       ├── src/
│       │   └── app/
│       │       ├── page.tsx   # Main booking page component
│       │       ├── layout.tsx # Root layout with metadata
│       │       ├── globals.css # Global styles and Tailwind imports
│       │       └── favicon.ico # Site favicon
│       ├── public/            # Static assets (SVG icons)
│       ├── node_modules/      # Frontend dependencies (auto-generated)
│       ├── .env.local         # Environment variables (create this)
│       ├── package.json       # Frontend dependencies and scripts
│       ├── package-lock.json  # Locked dependency versions
│       ├── tsconfig.json      # TypeScript configuration
│       ├── next.config.ts     # Next.js configuration
│       ├── postcss.config.mjs # PostCSS configuration for Tailwind
│       └── eslint.config.mjs  # ESLint configuration
│
└── README.md                  # This file
```

## 🔌 Complete API Documentation

The API follows RESTful principles and returns JSON responses. All endpoints are prefixed with `/api` except the health check.

### Base URL

```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

### API Endpoints

#### 1. GET `/api/slots`

Fetch all available booking slots for the next 30 days.

**Description:**
- Retrieves all booking slots with their availability status
- Automatically generates slots for the next 30 days (excluding Mondays)
- Returns slots sorted by date and time
- Preserves existing bookings

**Method:** `GET`

**URL:** `/api/slots`

**Headers:**
```
Content-Type: application/json
```

**Query Parameters:** None

**Request Body:** None

**Response:**

**Success (200 OK):**
```json
{
  "slots": [
    {
      "id": "slot_202601150700",
      "date": "2026-01-15",
      "time": "07:00",
      "booked": false
    },
    {
      "id": "slot_202601150800",
      "date": "2026-01-15",
      "time": "08:00",
      "booked": true,
      "bookedBy": "John Doe",
      "bookedAt": "2026-01-10T08:30:00.000Z"
    }
  ]
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Failed to fetch slots"
}
```

**Example using cURL:**
```bash
curl -X GET http://localhost:5000/api/slots
```

**Example using JavaScript (fetch):**
```javascript
const response = await fetch('http://localhost:5000/api/slots');
const data = await response.json();
console.log(data.slots);
```

**Slot Object Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the slot (format: `slot_YYYYMMDDHHMM`) |
| `date` | string | Date in ISO format (YYYY-MM-DD) |
| `time` | string | Time in 24-hour format (HH:MM) |
| `booked` | boolean | Whether the slot is booked |
| `bookedBy` | string (optional) | Name of the person who booked (only if booked) |
| `bookedAt` | string (optional) | ISO timestamp of when booking was made (only if booked) |

**Time Slots Available:**
- 07:00, 08:00, 09:00, 10:00, 11:00, 12:00
- 13:00, 14:00, 15:00, 16:00, 17:00, 18:00

**Business Rules:**
- Slots are generated for the next 30 days from the current date
- Mondays are excluded (closed for maintenance)
- Past dates are automatically filtered out
- Existing bookings are preserved when slots are regenerated

---

#### 2. POST `/api/book`

Book an available slot for a customer.

**Description:**
- Books a slot by its unique ID
- Validates that the slot exists and is available
- Prevents double-booking
- Records customer name and booking timestamp

**Method:** `POST`

**URL:** `/api/book`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "slotId": "slot_202601150700",
  "customerName": "John Doe"
}
```

**Request Body Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `slotId` | string | Yes | Unique identifier of the slot to book |
| `customerName` | string | No | Name of the customer (defaults to "Guest" if not provided) |

**Response:**

**Success (200 OK):**
```json
{
  "booked": true,
  "slot": {
    "id": "slot_202601150700",
    "date": "2026-01-15",
    "time": "07:00",
    "booked": true,
    "bookedBy": "John Doe",
    "bookedAt": "2026-01-10T08:30:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required field:
```json
{
  "error": "slotId is required"
}
```

**404 Not Found** - Slot doesn't exist:
```json
{
  "error": "Slot not found"
}
```

**409 Conflict** - Slot already booked:
```json
{
  "error": "Slot already booked"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to book slot"
}
```

**Example using cURL:**
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "slotId": "slot_202601150700",
    "customerName": "John Doe"
  }'
```

**Example using JavaScript (fetch):**
```javascript
const response = await fetch('http://localhost:5000/api/book', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    slotId: 'slot_202601150700',
    customerName: 'John Doe'
  })
});

const data = await response.json();
if (response.ok) {
  console.log('Booking successful:', data.slot);
} else {
  console.error('Booking failed:', data.error);
}
```

**Example using Python (requests):**
```python
import requests

url = "http://localhost:5000/api/book"
payload = {
    "slotId": "slot_202601150700",
    "customerName": "John Doe"
}

response = requests.post(url, json=payload)
data = response.json()

if response.status_code == 200:
    print("Booking successful:", data['slot'])
else:
    print("Booking failed:", data['error'])
```

---

#### 3. GET `/health`

Health check endpoint to verify API is running.

**Description:**
- Simple endpoint to check if the API server is running
- Useful for monitoring and deployment checks
- No authentication required

**Method:** `GET`

**URL:** `/health`

**Headers:** None required

**Request Body:** None

**Response:**

**Success (200 OK):**
```json
{
  "ok": true
}
```

**Example using cURL:**
```bash
curl -X GET http://localhost:5000/health
```

**Example using JavaScript (fetch):**
```javascript
const response = await fetch('http://localhost:5000/health');
const data = await response.json();
console.log('API Status:', data.ok ? 'Healthy' : 'Unhealthy');
```

---

#### 4. GET `/api/openapi.json`

Get the OpenAPI 3.0 specification for the API.

**Description:**
- Returns the complete OpenAPI specification
- Can be used with Swagger UI or other API documentation tools
- Provides detailed schema definitions for all endpoints

**Method:** `GET`

**URL:** `/api/openapi.json`

**Response:**

**Success (200 OK):**
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Court Booking API",
    "description": "A RESTful API for managing court/turf booking slots",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:5000",
      "description": "Development server"
    }
  ],
  "paths": {
    ...
  }
}
```

**Example using cURL:**
```bash
curl -X GET http://localhost:5000/api/openapi.json
```

---

### API Error Handling

All endpoints follow consistent error handling:

1. **400 Bad Request**: Invalid request parameters or missing required fields
2. **404 Not Found**: Resource (slot) not found
3. **409 Conflict**: Business rule violation (e.g., slot already booked)
4. **500 Internal Server Error**: Server-side error

All error responses follow this format:
```json
{
  "error": "Error message description"
}
```

### CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (development frontend)
- Any origin specified in `FRONTEND_URL` environment variable
- All origins in development (can be restricted in production)

### Rate Limiting

Currently, there is no rate limiting implemented. For production, consider adding:
- Express rate limit middleware
- Per-IP request limits
- Per-endpoint limits

## 🌐 Deployment

### Frontend Deployment (Vercel - Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend/mini-booking-app`
   - Add environment variable:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: Your backend API URL (e.g., `https://your-backend.railway.app`)
   - Click "Deploy"

3. **Vercel will automatically:**
   - Detect Next.js
   - Install dependencies
   - Build the project
   - Deploy to a global CDN

### Backend Deployment Options

#### Option 1: Railway (Recommended)

1. **Create account:** https://railway.app
2. **New Project:** Click "New Project"
3. **Deploy from GitHub:** Connect your repository
4. **Add Service:** Select "New Service" → "GitHub Repo"
5. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Environment Variables:**
   - `PORT`: (auto-set by Railway)
   - `FRONTEND_URL`: Your frontend URL
7. **Deploy:** Railway will automatically deploy

#### Option 2: Render

1. **Create account:** https://render.com
2. **New Web Service:** Click "New" → "Web Service"
3. **Connect GitHub:** Link your repository
4. **Configure:**
   - Name: `court-booking-api`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables:**
   - `PORT`: 5000 (or leave default)
   - `FRONTEND_URL`: Your frontend URL
6. **Deploy:** Click "Create Web Service"

#### Option 3: Heroku

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Login:** `heroku login`
3. **Create app:** `heroku create your-app-name`
4. **Set environment variables:**
   ```bash
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. **Deploy:**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```

### Environment Variables

**Frontend (.env.local or Vercel Environment Variables):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend (Railway/Render/Heroku Environment Variables):**
```
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:

- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktops** (1024px and up)
- **Large screens** (1280px and up)

### Responsive Features

- **Adaptive Grid Layouts**: Calendar and slot grids adjust based on screen size
- **Touch-Friendly Buttons**: Large tap targets for mobile users
- **Optimized Typography**: Font sizes scale appropriately
- **Mobile-First Approach**: Designed for mobile, enhanced for desktop
- **Modal Dialogs**: Full-screen on mobile, centered on desktop
- **Calendar View**: Compact on mobile, expanded on desktop

## 🔒 Security Considerations

For production deployment, consider implementing:

1. **Authentication & Authorization**
   - JWT tokens or session-based authentication
   - User roles and permissions
   - Protected API endpoints

2. **Rate Limiting**
   - Express rate limit middleware
   - Per-IP and per-user limits
   - Prevent abuse and DDoS attacks

3. **CORS Restrictions**
   - Restrict allowed origins in production
   - Remove wildcard CORS in production

4. **Input Validation**
   - Validate and sanitize all user inputs
   - Use libraries like `express-validator` or `joi`
   - Prevent SQL injection and XSS attacks

5. **Database Migration**
   - Migrate from JSON file to proper database (MongoDB/PostgreSQL)
   - Implement connection pooling
   - Add database indexes for performance

6. **HTTPS**
   - Use SSL/TLS certificates
   - Force HTTPS redirects
   - Secure cookie settings

7. **CSRF Protection**
   - Implement CSRF tokens
   - Use libraries like `csurf`

8. **Error Handling**
   - Don't expose sensitive error details
   - Log errors securely
   - Implement proper error monitoring

## 🧪 Testing the Application

### Manual Testing Steps

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend/mini-booking-app
   npm run dev
   ```

2. **Test Frontend:**
   - Open http://localhost:3000
   - Enter your name in the input field
   - Navigate the calendar (previous/next month)
   - Click on a date to view slots
   - Book an available slot
   - Verify the slot is marked as booked
   - Try booking the same slot again (should fail)

3. **Test API Directly:**
   ```bash
   # Health check
   curl http://localhost:5000/health

   # Get all slots
   curl http://localhost:5000/api/slots

   # Book a slot
   curl -X POST http://localhost:5000/api/book \
     -H "Content-Type: application/json" \
     -d '{"slotId":"slot_202601150700","customerName":"Test User"}'
   ```

### Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Health endpoint returns `{"ok":true}`
- [ ] Slots endpoint returns array of slots
- [ ] Calendar displays correctly
- [ ] Can navigate between months
- [ ] Can view slots for a date
- [ ] Can book an available slot
- [ ] Cannot book an already booked slot
- [ ] Cannot book without entering name
- [ ] Mondays are marked as closed
- [ ] Past dates are disabled
- [ ] Mobile responsive design works
- [ ] Error messages display correctly

## 📝 Project Details

### Business Logic

1. **Slot Generation:**
   - Slots are automatically generated for the next 30 days
   - Time slots: 7:00 AM to 6:00 PM (12 slots per day)
   - Mondays are excluded (closed for maintenance)
   - Past dates are automatically filtered out

2. **Booking Rules:**
   - Customer name is required to book a slot
   - Each slot can only be booked once
   - Bookings are permanent (no cancellation endpoint in current version)
   - Booking timestamp is automatically recorded

3. **Data Persistence:**
   - All data is stored in `backend/src/slots.json`
   - File is read/written synchronously with locking mechanism
   - Data persists between server restarts
   - Can be easily migrated to a database

### Frontend Features

1. **Calendar View:**
   - Month-by-month navigation
   - Visual indicators for available/booked slots
   - Today's date highlighted
   - Past dates and Mondays disabled

2. **Slot Booking:**
   - Modal dialog for viewing slots
   - Real-time availability display
   - Loading states during booking
   - Success/error notifications

3. **User Experience:**
   - Smooth animations and transitions
   - Responsive design for all devices
   - Clear visual feedback
   - Error handling with user-friendly messages

### Backend Architecture

1. **Server Setup:**
   - Express.js with JSON body parsing
   - CORS middleware for cross-origin requests
   - Error handling middleware
   - Health check endpoint

2. **Data Layer:**
   - File-based storage with `store.js`
   - Promise-based write operations with locking
   - Automatic slot generation
   - Data validation

3. **API Design:**
   - RESTful endpoints
   - Consistent error responses
   - OpenAPI documentation
   - Proper HTTP status codes

## 🐛 Troubleshooting

### Common Issues and Solutions

**Issue: Backend won't start**
- Check if port 5000 is already in use
- Verify Node.js version: `node --version` (should be v18+)
- Delete `node_modules` and run `npm install` again
- Check for syntax errors in `server.js`

**Issue: Frontend shows "Failed to load slots"**
- Verify backend is running on port 5000
- Check `.env.local` file exists and has correct URL
- Open browser console for detailed error messages
- Verify CORS is configured correctly

**Issue: Slots not appearing**
- Check `slots.json` file exists in `backend/src/`
- Verify file permissions (read/write access)
- Check backend console for errors
- Try refreshing the page

**Issue: Booking fails**
- Verify slot ID is correct
- Check if slot is already booked
- Verify customer name is provided
- Check backend console for errors

**Issue: TypeScript errors in frontend**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration
- Verify Next.js version compatibility

**Issue: Styling not working**
- Verify Tailwind CSS is installed
- Check `postcss.config.mjs` exists
- Restart the development server
- Clear browser cache

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR
- Ensure mobile responsiveness

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Pratyush Shrivastava**

- GitHub: [@yush87799](https://github.com/yush87799)
- LinkedIn: [pratyush28](https://www.linkedin.com/in/pratyush28/)

Built as part of a Full Stack Developer Intern assignment.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Express.js community for the robust backend framework
- All open-source contributors whose packages made this project possible

---

**Note**: This is a demonstration application. For production use, consider implementing authentication, proper database integration, payment processing, email notifications, and additional security measures.
