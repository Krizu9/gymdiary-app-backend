const validateInput = async (req, res, next) => {
    try {
        const { workout } = req.body;
        if (!workout) {
            return res.status(400).json({ error: 'Workout data is required' });
        }
        if (!workout.exerciseName || typeof workout.exerciseName !== 'string') {
            return res.status(400).json({ error: 'Exercise name is required and must be a string' });
        }
        const exerciseNameRegex = /^[a-zA-Z]{1,25}$/;
        if (!exerciseNameRegex.test(workout.exerciseName)) {
            return res.status(400).json({ error: 'Exercise name must consist of only lower or uppercase letters and have a maximum length of 25 characters' });
        }
        if (!workout.date) {
            return res.status(400).json({ error: 'Date is required and must be a valid date' });
        }
        if (!Array.isArray(workout.sets) || workout.sets.length === 0) {
            return res.status(400).json({ error: 'Sets data is required and must be a non-empty array' });
        }
        for (const set of workout.sets) {
            const reps = parseInt(set.reps);
            if (isNaN(reps) || reps < 1 || reps > 99) {
                return res.status(400).json({ error: 'Reps must be a string representing a number between 1 and 99' });
            }
            if (!set.set.startsWith('Set: ') || isNaN(parseInt(set.set.substring(5))) || parseInt(set.set.substring(5)) < 1 || parseInt(set.set.substring(5)) > 99) {
                return res.status(400).json({ error: 'Set must start with "Set: " followed by a number between 1 and 99' });
            }
            const weightRegex = /^[1-9][0-9]{0,2}([.,][0-9]{1,2})?\s?(?:kg|lbs)?$/;
            if (!weightRegex.test(set.weight)) {
                return res.status(400).json({ error: 'Weight must be a string representing a number between 1 and 999 followed by "kg" or "lbs"' });
            }
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = validateInput;
