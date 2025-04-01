const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { authenticateUser, authorizeRole, ROLES } = require('./auth');

/**
 * Get all courses
 * Accessible to all authenticated users
 */
router.get('/', authenticateUser, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM courses ORDER BY id ASC'
    );
    
    res.json({
      message: 'Courses retrieved successfully',
      courses: result.rows
    });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    res.status(500).json({ message: 'Server error while retrieving courses' });
  }
});

/**
 * Get a specific course by ID
 * Accessible to all authenticated users
 */
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get course details
    const courseResult = await db.query(
      'SELECT * FROM courses WHERE id = $1',
      [id]
    );
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const course = courseResult.rows[0];
    
    // Get course lessons
    const lessonsResult = await db.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_number ASC',
      [id]
    );
    
    course.lessons = lessonsResult.rows;
    
    res.json({
      message: 'Course retrieved successfully',
      course
    });
  } catch (error) {
    console.error('Error retrieving course:', error);
    res.status(500).json({ message: 'Server error while retrieving course' });
  }
});

/**
 * Create a new course
 * Accessible only to admin users
 */
router.post('/', authenticateUser, authorizeRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { title, description, duration, level } = req.body;
    
    // Validate input
    if (!title || !description || !duration || !level) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create new course
    const result = await db.query(
      'INSERT INTO courses (title, description, duration, level) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, duration, level]
    );
    
    res.status(201).json({
      message: 'Course created successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error while creating course' });
  }
});

/**
 * Update a course
 * Accessible only to admin users
 */
router.put('/:id', authenticateUser, authorizeRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, level } = req.body;
    
    // Validate input
    if (!title || !description || !duration || !level) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Update course
    const result = await db.query(
      'UPDATE courses SET title = $1, description = $2, duration = $3, level = $4 WHERE id = $5 RETURNING *',
      [title, description, duration, level, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({
      message: 'Course updated successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error while updating course' });
  }
});

/**
 * Delete a course
 * Accessible only to admin users
 */
router.delete('/:id', authenticateUser, authorizeRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete course
    const result = await db.query(
      'DELETE FROM courses WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({
      message: 'Course deleted successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error while deleting course' });
  }
});

/**
 * Add a lesson to a course
 * Accessible only to admin users
 */
router.post('/:id/lessons', authenticateUser, authorizeRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, order_number } = req.body;
    
    // Validate input
    if (!title || !description || !order_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if course exists
    const courseResult = await db.query(
      'SELECT * FROM courses WHERE id = $1',
      [id]
    );
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Add lesson
    const result = await db.query(
      'INSERT INTO lessons (course_id, title, description, order_number) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, title, description, order_number]
    );
    
    res.status(201).json({
      message: 'Lesson added successfully',
      lesson: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding lesson:', error);
    res.status(500).json({ message: 'Server error while adding lesson' });
  }
});

module.exports = router;
