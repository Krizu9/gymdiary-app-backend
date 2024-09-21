// routes/workout.js
const express = require('express');
const router = express.Router();

const { getLatestWorkoutByTemplateId, createWorkout, deleteWorkout, updateWorkout, getWorkoutsByTemplateId } = require('../controller/workout');

const authMiddleware = require('../middleware/authentication');

// route to get latest workout by template ID
router.get('/:templateId', authMiddleware, getLatestWorkoutByTemplateId);

// route to get all workouts by template ID
router.get('/all/:templateId', authMiddleware, getWorkoutsByTemplateId);

// route to create a new workout
router.post('/create', authMiddleware, createWorkout);

// route to delete a workout by ID
router.delete('/delete', authMiddleware, deleteWorkout);

// route to update a workout by ID
router.put('/update', authMiddleware, updateWorkout);



module.exports = router;
