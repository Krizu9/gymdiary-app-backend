const express = require('express');
const logger = require('./middleware/logger');

const app = express();

const cors = require('cors');
app.use(cors());
app.options('*', cors())

app.use(express.json());
app.use(logger);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]  ${req.method} ${req.url}`);
    next();
});

const actionsRouter = require('./routes/actions');
app.use('/actions', actionsRouter);

const userdataRouter = require('./routes/userdata');
app.use('/userdata', userdataRouter);


const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

const checkTokenRouter = require('./routes/checkToken');
app.use('/checkToken', checkTokenRouter);

const port = 5001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});