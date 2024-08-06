const express = require('express');
const logger = require('./middleware/logger');
const cors = require('cors');
const app = express();

// middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(logger);

// logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// routes
const actionsRouter = require('./routes/actions');
app.use('/actions', actionsRouter);

const userdataRouter = require('./routes/userdata');
app.use('/userdata', userdataRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
