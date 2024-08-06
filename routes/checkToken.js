const express = require('express')
const loginRouter = express.Router()

const checkToken = require('../controller/checkToken')


loginRouter.post('/', async (req, res) => {
    checkToken(req, res)
})

module.exports = loginRouter