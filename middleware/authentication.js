const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    try {
        if (!token) {
            return res.status(401).json({ error: 'No token delivered' });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decodedToken) {
            req.user = decodedToken; // Set req.user instead of req.userId
            next();
        } else {
            return res.status(401).json({ error: 'Invalid token, please login' });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = authentication;
