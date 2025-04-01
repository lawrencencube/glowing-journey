# AI Learning Platform MVP Documentation

## Project Overview

This documentation provides a comprehensive overview of the Minimum Viable Product (MVP) for an interactive AI learning platform. The platform offers courses on AI prompting, AI models, AI workflows, GPTs, and Python for AI, with various course durations ranging from a Boot Camp to a two-year program.

The MVP focuses on content delivery and user authentication, with plans to integrate interactive features such as coding exercises and AI tool integrations in future phases. The solution uses open-source tools and is deployable on free-tier hosting services to keep costs low while ensuring scalability.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Tech Stack](#tech-stack)
3. [User Authentication & Roles](#user-authentication--roles)
4. [Course Page](#course-page)
5. [Deployment Guide](#deployment-guide)
6. [Future Enhancements](#future-enhancements)

## Project Structure

The AI Learning Platform MVP is organized into the following directory structure:

```
ai-learning-platform/
├── backend/
│   └── auth-routes.js       # Authentication routes and middleware
├── frontend/
│   └── ai-boot-camp.html    # AI Boot Camp course page
└── docs/
    ├── tech_stack_recommendation.md  # Tech stack documentation
    ├── deployment_guide.md           # Deployment instructions
    └── todo.md                       # Development checklist
```

## Tech Stack

The MVP uses a modern, open-source tech stack that is cost-effective, scalable, and compatible with free-tier hosting services:

### Backend
- **Node.js with Express**: A lightweight and efficient JavaScript runtime and web framework
- **JWT (JSON Web Tokens)**: For secure user authentication
- **bcrypt**: For password hashing and security

### Database
- **PostgreSQL via Supabase**: A powerful relational database with built-in authentication features

### Frontend
- **HTML5/CSS3**: For structure and styling
- **Bootstrap 5**: For responsive design and UI components
- **JavaScript**: For client-side interactivity

For detailed justifications and future considerations, please refer to the [Tech Stack Recommendation](tech_stack_recommendation.md) document.

## User Authentication & Roles

The MVP implements a secure authentication system using Node.js, Express, and JWT. The implementation includes:

### Authentication Routes
- **Sign-up route**: Allows users to create accounts with email and password
- **Login route**: Authenticates users and issues a JWT
- **Protected route middleware**: Restricts access to authenticated users only

### User Roles
- **Learner**: Default role with access to course content
- **Admin**: Advanced role with user and content management capabilities

The authentication system is designed to be secure and scalable, with future provisions for an instructor role. For implementation details, refer to the [auth-routes.js](../backend/auth-routes.js) file.

## Course Page

The AI Boot Camp course page demonstrates the user interface for course content delivery. The page includes:

### Key Components
- **Header**: Displays the title 'AI Boot Camp' with a visually appealing hero section
- **Overview Section**: Describes the Boot Camp's coverage of AI prompting, AI models, AI workflows, GPTs, and Python for AI
- **Lessons List**: Provides three placeholder lessons with titles and descriptions
- **Other Courses Section**: Briefly describes additional course offerings of varying durations

The page is built with HTML and Bootstrap, ensuring a responsive and visually appealing design that works across different devices. The implementation can be found in the [ai-boot-camp.html](../frontend/ai-boot-camp.html) file.

## Deployment Guide

The MVP is designed to be deployed on free-tier hosting services to minimize costs while ensuring scalability. The deployment architecture consists of:

1. **Frontend**: Static HTML/CSS/JS files hosted on Netlify
2. **Backend**: Node.js/Express API hosted on Render
3. **Database**: PostgreSQL database hosted on Supabase

The deployment guide provides step-by-step instructions for:
- Setting up a Supabase account and database
- Deploying the backend to Render
- Deploying the frontend to Netlify
- Connecting all components
- Testing the deployment

For detailed deployment instructions, refer to the [Deployment Guide](deployment_guide.md) document.

## Future Enhancements

While the MVP focuses on content delivery and user authentication, the platform is designed with future enhancements in mind:

### Interactive Features
- Coding exercises with real-time feedback
- Integration with AI models for hands-on practice
- Progress tracking and assessments

### Content Management
- Instructor portal for course creation and management
- Content versioning and updates
- Student progress analytics

### Community Features
- Discussion forums for each course
- Peer review and collaboration tools
- Project showcases

The tech stack and architecture have been selected to support these future enhancements without significant refactoring.

## Conclusion

The AI Learning Platform MVP provides a solid foundation for an interactive learning experience focused on AI technologies. By prioritizing content delivery and user authentication in this initial phase, the platform can quickly deliver value to users while establishing the infrastructure for more advanced features in future iterations.

The use of open-source tools and free-tier hosting services ensures cost-effectiveness without sacrificing scalability, making this MVP both practical for immediate deployment and sustainable for long-term growth.
