const { Workouts } = require('../models/actionsSchema');

require('dotenv').config();

const getActions = async (req, res) => {
    let token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).json({ error: 'No token delivered' });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        const [tokenPart, userId] = token.split(',');

        const workouts = await Workouts.find({ user: userId });
        res.send(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createAction = async (req, res) => {
    try {
        const { token, workout } = req.body;
        const [tokenPart, userId] = token.split(',');
        const action = workout.exerciseName;
        const sets = workout.sets;
        const day = workout.date;
        const workoutToDB = new Workouts({ action: action, sets: sets, day: day, user: userId });
        await workoutToDB.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAction = async (req, res) => {
    try {
        const { id } = req.params;
        const { workout } = req.body;
        const updated = await Workouts.findByIdAndUpdate(id, workout, { new: true });

        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteAction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Workouts.findByIdAndDelete(id);
        res.status(200).json(deleted);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getActions, createAction, updateAction, deleteAction }
