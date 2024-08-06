const userdataRouter = require('express').Router();

const { getuserdata } = require('../controller/userdata');

const authentication = require('../middleware/authentication');

userdataRouter.get('/:id', authentication, async (req, res) => {
    try {
        await getuserdata(req, res);
    } catch (error) {
        console.error(error);
    };
});

module.exports = userdataRouter;