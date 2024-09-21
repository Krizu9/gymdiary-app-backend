// routes/workoutTemplate.js
const express = require('express');
const router = express.Router();
const { getWorkoutsByUserId, createWorkoutTemplate, deleteWorkoutTemplate, updateWorkoutTemplate } = require('../controller/workoutTemplate');

const authMiddleware = require('../middleware/authentication');

// Route to get workout templates by user ID
router.get('/byUser', authMiddleware, getWorkoutsByUserId);

// Route to create a new workout template
router.post('/create', authMiddleware, createWorkoutTemplate);

// Route to delete a workout template by ID
router.delete('/delete', authMiddleware, deleteWorkoutTemplate);

// Route to update a workout template by ID
router.put('/update', authMiddleware, updateWorkoutTemplate);

module.exports = router;

