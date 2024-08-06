const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User } = require('../models/user');

const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        // validation
        if (!name || !password) {
            return res.status(401).json({ error: 'No name or password delivered' });
        }

        // find the user
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // check password
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // generate JWT
        const userForToken = {
            name: user.name,
            id: user._id
        };

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token, user: user._id });
    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = login;
