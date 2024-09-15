const mongoose = require('mongoose');

const workoutMovementSchema = new mongoose.Schema({
    movement: { type: String, required: true },
    sets: { type: Number, required: true },
    lowestReps: { type: Number, required: true },
    highestReps: { type: Number, required: true }
}, { _id: false }); // Prevent creation of a separate ID for each movement

const workoutTemplateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    movements: [workoutMovementSchema], // Array of movements
}, { timestamps: true });

module.exports = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
