const express = require('express')
const actionsRouter = express.Router()
const authentication = require('../middleware/authentication')
const validateInput = require('../middleware/validateInput')

const { getActions, createAction, updateAction, deleteAction } = require('../controller/actions')


actionsRouter.get('/', authentication, async (req, res) => {
    try {
        getActions(req, res)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

actionsRouter.post('/', authentication, validateInput , async (req, res) => {
    try {
        createAction(req, res)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



actionsRouter.put('/:id', authentication, validateInput,  async (req, res) => {
    try {
        updateAction(req, res)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

actionsRouter.delete('/:id', authentication, async (req, res) => {
    try {
        deleteAction(req, res)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = actionsRouter