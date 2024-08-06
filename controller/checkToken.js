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

        res.setHeader('Content-Type', 'application/json');
        res.send({ access: decodedToken });
        res.status(200).json({ response: "OK!" });
    } catch (error) {
        console.log('checkToken failed ' + error.message);
    }

}

module.exports = checkToken;