# Deployment Guide for AI Learning Platform MVP

This guide provides step-by-step instructions for deploying the AI Learning Platform MVP to free-tier hosting services. The deployment architecture consists of three main components:

1. **Frontend**: Static HTML/CSS/JS files hosted on Netlify
2. **Backend**: Node.js/Express API hosted on Render
3. **Database**: PostgreSQL database hosted on Supabase

## 1. Setting Up a Supabase Account and Database

Supabase provides a generous free tier that includes PostgreSQL database hosting and built-in authentication services.

### 1.1. Create a Supabase Account

1. Visit [https://supabase.com/](https://supabase.com/) and click "Start your project"
2. Sign up using your GitHub account or email
3. Verify your email if required

### 1.2. Create a New Project

1. From the Supabase dashboard, click "New Project"
2. Enter a name for your project (e.g., "ai-learning-platform")
3. Set a secure database password (save this for later use)
4. Choose the free tier and a region closest to your target audience
5. Click "Create new project" and wait for the setup to complete (may take a few minutes)

### 1.3. Set Up Database Tables

1. Once your project is created, navigate to the "SQL Editor" in the left sidebar
2. Create the necessary tables for your application by executing the following SQL:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'learner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

3. Insert sample data for courses:

```sql
-- Insert sample courses
INSERT INTO courses (title, description, duration, level) VALUES
('AI Boot Camp', 'Accelerate your AI journey with our intensive boot camp program', '4 weeks', 'Beginner'),
('Three-Month AI Course', 'Build foundational AI skills with our comprehensive program', '3 months', 'Beginner to Intermediate'),
('Six-Month AI Course', 'Expand your AI expertise with our intermediate program', '6 months', 'Intermediate'),
('One-Year AI Course', 'Master AI concepts and applications with our comprehensive program', '1 year', 'Intermediate to Advanced'),
('Two-Year AI Course', 'Become an AI professional with our in-depth training program', '2 years', 'Advanced');

-- Insert sample lessons for AI Boot Camp
INSERT INTO lessons (course_id, title, description, order_number) VALUES
(1, 'Introduction to AI Prompting', 'Learn how to craft effective prompts for AI systems', 1),
(1, 'Exploring AI Models', 'Understand the basics of AI model architectures', 2),
(1, 'Python for AI Basics', 'Get started with Python programming for AI applications', 3);
```

### 1.4. Get Database Connection Information

1. In the Supabase dashboard, go to "Project Settings" > "Database"
2. Under "Connection Info", note down the following:
   - Host
   - Database name
   - Port
   - User
   - Password (the one you set during project creation)
3. Also, find your Supabase URL and anon key under "Project Settings" > "API"

## 2. Deploying the Backend to Render

Render provides a free tier for web services that is suitable for hosting the Node.js/Express backend.

### 2.1. Prepare Your Backend Code for Deployment

1. Make sure your backend code is in a Git repository (GitHub, GitLab, etc.)
2. Ensure your package.json includes the following:
   - All required dependencies (express, pg, bcrypt, jsonwebtoken, cors, etc.)
   - A start script: `"start": "node server.js"`
   - Engines specification: `"engines": { "node": ">=14.0.0" }`

3. Create a `server.js` file in your backend directory with the following content:

```javascript
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const authRoutes = require('./auth-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Make db available to routes
app.use((req, res, next) => {
  req.db = pool;
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'AI Learning Platform API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

4. Update your auth-routes.js file to use the PostgreSQL database instead of the mock array

### 2.2. Create a Render Account

1. Visit [https://render.com/](https://render.com/) and sign up
2. Connect your GitHub or GitLab account

### 2.3. Deploy Your Backend Service

1. From the Render dashboard, click "New" and select "Web Service"
2. Connect your Git repository containing the backend code
3. Configure your web service:
   - Name: `ai-learning-platform-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select the free plan
4. Add environment variables:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string (format: `postgresql://postgres:[YOUR_PASSWORD]@[YOUR_HOST]:[PORT]/postgres`)
   - `JWT_SECRET`: A secure random string for JWT token signing
5. Click "Create Web Service"
6. Wait for the deployment to complete (this may take a few minutes)
7. Once deployed, note the URL of your service (e.g., `https://ai-learning-platform-api.onrender.com`)

## 3. Deploying the Frontend to Netlify

Netlify provides a generous free tier for hosting static websites.

### 3.1. Prepare Your Frontend Code for Deployment

1. Make sure your frontend code is in a Git repository
2. Update any API endpoint URLs in your frontend code to point to your Render backend URL

### 3.2. Create a Netlify Account

1. Visit [https://www.netlify.com/](https://www.netlify.com/) and sign up
2. Connect your GitHub or GitLab account

### 3.3. Deploy Your Frontend

1. From the Netlify dashboard, click "New site from Git"
2. Select your Git provider and repository
3. Configure your build settings:
   - Build command: Leave blank (for simple HTML/CSS/JS) or use `npm run build` if using a build tool
   - Publish directory: The directory containing your HTML files (e.g., `frontend`)
4. Click "Deploy site"
5. Wait for the deployment to complete
6. Once deployed, Netlify will provide a URL for your site (e.g., `https://ai-learning-platform.netlify.app`)
7. You can set up a custom domain later if desired

### 3.4. Environment Variables (if needed)

If your frontend needs to access environment variables:

1. Go to "Site settings" > "Build & deploy" > "Environment"
2. Add environment variables such as `REACT_APP_API_URL` pointing to your Render backend URL

## 4. Connecting the Components

### 4.1. Update Frontend API Calls

Ensure all API calls in your frontend code point to your Render backend URL:

```javascript
// Example fetch call to the backend API
fetch('https://ai-learning-platform-api.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: email,
    password: password
  })
})
.then(response => response.json())
.then(data => {
  // Handle response
})
.catch(error => {
  // Handle error
});
```

### 4.2. CORS Configuration

Ensure your backend has proper CORS configuration to accept requests from your Netlify frontend:

```javascript
// In your server.js file
const cors = require('cors');

// Use CORS middleware with your Netlify URL
app.use(cors({
  origin: 'https://ai-learning-platform.netlify.app'
}));
```

## 5. Testing the Deployment

1. Visit your Netlify URL to access the frontend
2. Test user registration and login functionality
3. Verify that course data is being retrieved from the database
4. Test protected routes to ensure authentication is working correctly

## 6. Monitoring and Maintenance

### 6.1. Supabase Dashboard

- Monitor database usage through the Supabase dashboard
- Check authentication logs and user management

### 6.2. Render Dashboard

- Monitor backend service logs and performance
- Check for any errors or issues

### 6.3. Netlify Dashboard

- Monitor frontend deployment status
- Check site analytics and form submissions

## 7. Free Tier Limitations and Considerations

### 7.1. Supabase Free Tier

- 500MB database storage
- Limited database connections
- May experience performance limitations

### 7.2. Render Free Tier

- Services spin down after 15 minutes of inactivity
- Limited compute resources
- 750 hours of runtime per month

### 7.3. Netlify Free Tier

- 100GB bandwidth per month
- Limited build minutes
- Limited form submissions

## 8. Future Scaling Considerations

As your platform grows, consider:

1. Upgrading to paid tiers for better performance and reliability
2. Implementing caching strategies to reduce database load
3. Setting up a CDN for static assets
4. Implementing server-side rendering for improved SEO and performance
5. Adding monitoring and alerting for proactive issue detection

## Conclusion

This deployment guide provides a cost-effective way to host your AI Learning Platform MVP using free-tier services. While there are limitations to the free tiers, they provide a solid foundation for testing and initial user feedback. As your platform grows, you can easily upgrade to paid tiers or migrate to more robust hosting solutions.
