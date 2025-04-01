-- Database Schema for AI Learning Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Create admin user (password: admin123)
INSERT INTO users (email, name, password, role) VALUES
('admin@ailearningplatform.com', 'Admin User', '$2b$10$3euPcmQFCiblsZeEu5s7p.9MUZWg1IkuD4aHr2Q1aKWSPqm8CpUJ.', 'admin');

-- Create sample learner (password: learner123)
INSERT INTO users (email, name, password, role) VALUES
('learner@example.com', 'Sample Learner', '$2b$10$xWEEwzR6hYQQJ3xDCfEIFOQgUYLJrjKPWCUJowEMVm8k4FP1Pj3Oe', 'learner');

-- Enroll sample learner in AI Boot Camp
INSERT INTO enrollments (user_id, course_id) VALUES
((SELECT id FROM users WHERE email = 'learner@example.com'), 1);
