const workout = require('../models/workout');

// Get workouts by user ID
const getLatestWorkoutByTemplateId = async (req, res) => {
    console.log('Request User:', req.user);
    try {
        const userId = req.user.id;
        const { templateId } = req.params;

        // find the most recent workout for the given user and template
        const latestWorkout = await workout.findOne({ userId, workoutTemplateId: templateId }).sort({ date: -1 });

        console.log('Latest Workout:', latestWorkout);
        res.status(200).json(latestWorkout || {}); // return an empty object if no workout is found
    } catch (error) {
        console.error('Error fetching latest workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getWorkoutsByTemplateId = async (req, res) => {
    try {
        const userId = req.user.id;
        const { templateId } = req.params;

        // find all workouts for the given user and template
        const workouts = await workout.find({ userId, workoutTemplateId: templateId });

        console.log('Workouts:', workouts);
        res.status(200).json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Create a new workout
// Create a new workout
const createWorkout = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const userId = req.user.id; // extract userId from the request object set by authMiddleware
        const { workoutTemplateId, movements, date } = req.body;

        // validate input
        if (!workoutTemplateId || !Array.isArray(movements) || movements.some(movement =>
            !movement.movement || movement.sets == null || movement.reps == null)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // create and save the workout with all movements
        const newWorkout = new workout({
            userId,
            workoutTemplateId,
            date,
            movements
        });

        const savedWorkout = await newWorkout.save();

        console.log('Saved Workout:', savedWorkout);
        res.status(201).json({ message: 'Workout created successfully', workout: savedWorkout });
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Delete a workout by ID
const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.query; // id as a query parameter

        if (!id) {
            return res.status(400).json({ error: 'Missing workout ID' });
        }

        const deletedWorkout = await workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        console.log('Deleted Workout:', deletedWorkout);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a workout by ID
const updateWorkout = async (req, res) => {
    try {
        const { id } = req.query; // id as a query parameter
        const { name, movements } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Missing workout ID' });
        }

        if (!name || !Array.isArray(movements) || movements.some(movement =>
            !movement.movement || movement.sets == null || movement.reps == null)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const updatedWorkout = await workout.findByIdAndUpdate(id, { name, movements }, { new: true });

        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        console.log('Updated Workout:', updatedWorkout);
        res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { getLatestWorkoutByTemplateId, createWorkout, deleteWorkout, updateWorkout, getWorkoutsByTemplateId };