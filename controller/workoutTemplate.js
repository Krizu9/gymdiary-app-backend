const WorkoutTemplate = require('../models/workoutTemplate');

// Get workout templates by user ID
const getWorkoutsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const workoutsModels = await WorkoutTemplate.find({ userId });
        res.status(200).json(workoutsModels);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new workout template
const createWorkoutTemplate = async (req, res) => {

    try {
        const userId = req.user.id; // Extract userId from the request object set by authMiddleware
        const { name, movements } = req.body;

        // Validate input
        if (!name || !Array.isArray(movements) || movements.some(movement =>
            movement.index == null || !movement.movement || movement.sets == null || movement.lowestReps == null || movement.highestReps == null)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create and save the workout template with all movements
        const newWorkoutTemplate = new WorkoutTemplate({
            userId,
            name,
            movements
        });

        await newWorkoutTemplate.save();

        res.status(201).json({ message: 'Workout template created successfully', workoutTemplate: newWorkoutTemplate });
    } catch (error) {
        // Debugging: Log error details
        console.error('Error creating workout template:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// Delete a workout template by ID
const deleteWorkoutTemplate = async (req, res) => {
    try {
        const { id } = req.query; // Expect ID as a query parameter

        if (!id) {
            return res.status(400).json({ error: 'Missing workout template ID' });
        }

        const result = await WorkoutTemplate.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Workout template not found' });
        }

        res.status(200).json({ message: 'Workout template deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update a workout template by ID
const updateWorkoutTemplate = async (req, res) => {
    console.log("pääsee tänne")
    try {
        console.log('Request body:', req.body);

        const { id, name, movements } = req.body; // Ensure data is sent in the body

        // Validate the required fields
        if (!id || !name || !Array.isArray(movements)) {
            console.error('Validation failed:', { id, name, movements });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Updating workout template with ID:', id);
        console.log('New name:', name);
        console.log('New movements:', movements);

        // Find the existing workout template
        const existingWorkout = await WorkoutTemplate.findById(id);

        if (!existingWorkout) {
            console.error('Workout template not found with ID:', id);
            return res.status(404).json({ error: 'Workout template not found' });
        }

        // Update the existing workout template
        existingWorkout.name = name;
        existingWorkout.movements = movements; // Replace or merge movements as needed

        const updatedWorkout = await existingWorkout.save();

        console.log('Successfully updated workout template:', updatedWorkout);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getWorkoutsByUserId,
    createWorkoutTemplate,
    deleteWorkoutTemplate,
    updateWorkoutTemplate
};
