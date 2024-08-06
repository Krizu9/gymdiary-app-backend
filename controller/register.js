const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    console.log('register request received');
    const { name, email, password, passwordConfirmation } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (!name || !email || !password || !passwordConfirmation) {
            return res.status(400).send({ success: false, msg: 'All fields are required.' });
        }
        if (userExists) {
            return res.status(400).send({ success: false, msg: 'User already exists with this email: ' + email + '.' });
        }
        if (password !== passwordConfirmation) {
            return res.status(400).send({ success: false, msg: 'Password and password confirmation do not match.' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name,
            email,
            password: passwordHash
        });

        await user.save();
        res.status(200).json({ success: true, msg: 'User created successfully.' });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
};

module.exports = { createUser };
