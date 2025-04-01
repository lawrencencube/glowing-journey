// User Authentication Code for AI Learning Platform
// This file contains code snippets for implementing user authentication in a Node.js Express application

// Required packages:
// npm install express bcrypt jsonwebtoken

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock database for demonstration purposes
// In production, replace with actual PostgreSQL database connection
const users = [];

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable in production
const SALT_ROUNDS = 10;

// User Roles
const ROLES = {
  LEARNER: 'learner',
  ADMIN: 'admin'
  // INSTRUCTOR: 'instructor' // To be added in future phases
};

/**
 * User Sign-up Route
 * Allows users to create accounts with email and password
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Create new user (with learner role by default)
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      role: ROLES.LEARNER,
      createdAt: new Date()
    };
    
    // Save user to database
    users.push(newUser);
    
    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ 
      message: 'User created successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

/**
 * User Login Route
 * Authenticates users and issues a JWT
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return token and user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

/**
 * Protected Route Middleware
 * Restricts access to authenticated users only
 */
const authenticateUser = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user data to request
    req.user = decoded;
    
    // Continue to the protected route
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Role-Based Authorization Middleware
 * Restricts access based on user role
 */
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    
    next();
  };
};

/**
 * Example Protected Route for Learners
 */
router.get('/courses', authenticateUser, (req, res) => {
  // This route is accessible to all authenticated users
  res.json({ 
    message: 'Courses retrieved successfully',
    courses: [
      { id: 1, title: 'AI Boot Camp' },
      { id: 2, title: 'Three-Month AI Course' },
      { id: 3, title: 'Six-Month AI Course' },
      { id: 4, title: 'One-Year AI Course' },
      { id: 5, title: 'Two-Year AI Course' }
    ]
  });
});

/**
 * Example Protected Route for Admins
 */
router.get('/admin/users', 
  authenticateUser, 
  authorizeRole([ROLES.ADMIN]), 
  (req, res) => {
    // This route is only accessible to users with the ADMIN role
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json({
      message: 'Users retrieved successfully',
      users: usersWithoutPasswords
    });
  }
);

// Export router for use in main application
module.exports = router;

/**
 * Integration in main Express application:
 * 
 * const express = require('express');
 * const authRoutes = require('./auth-routes');
 * 
 * const app = express();
 * 
 * app.use(express.json());
 * app.use('/api/auth', authRoutes);
 * 
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 */
