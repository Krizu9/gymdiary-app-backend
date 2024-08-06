const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        console.log('login request received');
        console.log('name: ' + name + ' password: ' + password);
        if (!name || !password) {
            res.status(401).json({ error: 'No username or password delivered' });
        }
        const user = await User.findOne({ name });

        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);

        if (!(user && passwordCorrect)) {
            return res.status(401).json({ error: 'invalid username or password' })
        }

        const userForToken = {
            name: name,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        console.log('login success');
        res.setHeader('Content-Type', 'application/json');
        res.send({ token: token, user: user._id });
        res.status(200).json({ response: "OK!" });
    }
    catch (error) {
        console.log('login failed ' + error.message);

    };
}



module.exports = login;