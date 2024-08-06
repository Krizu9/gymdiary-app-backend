const mongoose = require('mongoose');
const { Register } = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    const { name, email, password, passwordConfirmation } = req.body;
    const userExists = await Register.findOne({ email });
    if (!name || !email || !password || !passwordConfirmation) {
        return res.status(400).send({ success: false, msg: 'All fields are required.' });
    }
    if (userExists) {
        return res.status(400).send({ success: false, msg: 'User already exists with this email: ' + email + '.' });
    }
    if (password !== passwordConfirmation) {
        return res.status(400).send({ success: false, msg: 'Password and password confirmation does not match.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new Register({
        name,
        email,
        password: passwordHash
    })
    await user.save();
    res.status(200).json({ success: true, msg: 'User created successfully.' });
};

module.exports = { createUser };