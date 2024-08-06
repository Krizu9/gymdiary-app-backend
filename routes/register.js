const registerRouter = require('express').Router();
const { createUser } = require('../controller/register');

registerRouter.post('/', (req, res) => {
    try {
        createUser(req, res);
    } catch (error) {
        console.error(error);
    };
});

module.exports = registerRouter;