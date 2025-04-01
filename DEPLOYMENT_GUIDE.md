# AI Learning Platform - Deployment Guide

## Overview

This document provides instructions for deploying the AI Learning Platform, a comprehensive online learning system focused on AI prompting, AI models, AI workflows, GPTs, and Python for AI. The platform offers courses of varying durations from a Boot Camp to a two-year program.

## Project Structure

```
ai-learning-platform/
├── backend/
│   ├── config/
│   │   └── config.js         # Configuration settings
│   ├── db/
│   │   ├── schema.sql        # Database schema and sample data
│   │   └── db-init.js        # Database initialization script
│   ├── models/
│   │   └── db.js             # Database connection module
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── courses.js        # Course management routes
│   ├── .env.example          # Example environment variables
│   ├── .env.production       # Production environment variables
│   ├── package.json          # Backend dependencies
│   ├── render.yaml           # Render deployment configuration
│   └── server.js             # Main server file
├── frontend/
│   ├── css/
│   │   └── styles.css        # Custom styles
│   ├── js/
│   │   ├── auth.js           # Authentication functionality
│   │   └── main.js           # Main JavaScript functionality
│   ├── ai-boot-camp.html     # AI Boot Camp course page
│   ├── index.html            # Homepage
│   ├── login.html            # Login page
│   └── signup.html           # Signup page
├── docs/
│   ├── deployment_todo_updated.md  # Deployment checklist
│   └── mvp_documentation.md        # Original MVP documentation
├── deploy.sh                 # Deployment script
├── netlify.toml              # Netlify configuration
└── verify.sh                 # Verification script
```

## Deployment Steps

### 1. Database Deployment (Supabase)

1. Create a Supabase account at [https://supabase.com/](https://supabase.com/)
2. Create a new project
3. Navigate to the SQL Editor in your Supabase dashboard
4. Copy the contents of `backend/db/schema.sql` and execute it in the SQL Editor
5. Note down your PostgreSQL connection string from Project Settings > Database

### 2. Backend Deployment (Render)

1. Create a Render account at [https://render.com/](https://render.com/)
2. Connect your GitHub/GitLab repository containing the AI Learning Platform code
3. Create a new Web Service
4. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables: Copy from `.env.production` and update with your Supabase connection string
5. Deploy the service
6. Note down your backend URL (e.g., https://ai-learning-platform-api.onrender.com)

### 3. Frontend Deployment (Netlify)

1. Create a Netlify account at [https://netlify.com/](https://netlify.com/)
2. Connect your GitHub/GitLab repository
3. Configure the deployment:
   - Publish directory: `frontend`
   - Build command: (leave empty for static site)
4. Deploy the site
5. Note down your frontend URL (e.g., https://ai-learning-platform.netlify.app)

### 4. Update API URL

After deployment, you need to update the API URL in the frontend code:

1. In the Netlify dashboard, go to Site settings > Environment variables
2. Add a new variable: `API_URL` with the value of your Render backend URL + `/api`
3. Redeploy your site

## Verification

Run the verification script to check if your deployment is working correctly:

```bash
./verify.sh
```

Follow the prompts to verify:
- Backend API accessibility
- Frontend accessibility
- Authentication endpoints
- Courses endpoints
- Responsive design
- User registration and login

## Default Accounts

The system comes with two pre-configured accounts:

1. Admin User:
   - Email: admin@ailearningplatform.com
   - Password: admin123

2. Sample Learner:
   - Email: learner@example.com
   - Password: learner123

## Customization

To customize the platform for your needs:

1. Update the course content in the database
2. Modify the frontend HTML/CSS to match your branding
3. Add additional features as needed

## Troubleshooting

If you encounter issues during deployment:

1. Check the logs in your Render dashboard for backend errors
2. Check the deployment logs in Netlify for frontend errors
3. Verify that your database connection string is correct
4. Ensure CORS is properly configured to allow communication between frontend and backend

## Security Considerations

Before going to production:

1. Change the default admin password
2. Generate a secure JWT secret
3. Enable SSL for database connections
4. Set up proper authentication for production

## Next Steps

After successful deployment, consider:

1. Adding more course content
2. Implementing payment processing
3. Adding user progress tracking
4. Enhancing the platform with interactive coding exercises
5. Integrating with AI tools for hands-on practice

For any questions or support, please refer to the documentation or contact the development team.
