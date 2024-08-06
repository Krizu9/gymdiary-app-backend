const express = require('express')
const loginRouter = express.Router()

const login = require('../controller/login')


loginRouter.post('/', async (req, res) => {
    login(req, res)
})

module.exports = loginRouter