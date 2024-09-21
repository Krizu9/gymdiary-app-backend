const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Workout' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    workoutTemplateId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'WorkoutTemplate' },
    date: { type: Date, required: true },
    movements: [{
        movement: { type: String, required: true },
        weight: [{ type: Number, required: true }],
        sets: { type: Number, required: true },
        reps: [{ type: Number, required: true }]
    }]

}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);