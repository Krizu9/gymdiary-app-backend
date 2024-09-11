const express = require('express');
const router = express.Router();

const { createUser } = require('../controller/register');
const login = require('../controller/login');
const checkToken = require('../controller/checkToken');

router.post('/register', async (req, res) => {
    try {
        await createUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

router.post('/login', async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/checkToken', async (req, res) => {
    try {
        await checkToken(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
