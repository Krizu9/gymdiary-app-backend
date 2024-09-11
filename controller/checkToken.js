const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'No token delivered' });
        }

        const [tokenPart, userId] = token.split(',');
        const decodedToken = jwt.verify(tokenPart, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({ access: decodedToken, response: "OK!" });
    } catch (error) {
        return res.status(500).json({ error: 'Token verification failed' });
    }
}

module.exports = checkToken;
