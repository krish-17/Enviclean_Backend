const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');

const authService = require('./src/services/authService');
const appRouter = require('./src/routes/appRoute');
const userRouter = require('./src/routes/userRoute');
const depositorRouter = require('./src/routes/depositorRoute');
const patronPostRouter = require('./src/routes/patronPostRoute');
const settingsRouter = require('./src/routes/settingRoute');
const collectorRouter = require('./src/routes/collectorRoute');
const blogRouter = require('./src/routes/blogRoute');
const rewardsRouter = require('./src/routes/rewardsRoute');
const db = require('./src/config/db.config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

db.sequelize.sync();

app.use('/app', appRouter);
app.use('/blogs', blogRouter);

app.use(async(req, res, next) => {
    const auth = await authService.authenticateUser(req.headers.token);
    if (auth) {
        next();
    } else {
        res.status(401).send({ message: "Unauthenticated request.", success: false });
    }
});

app.use('/user', userRouter);
app.use('/depositor', depositorRouter);
app.use('/patron', patronPostRouter);
app.use('/settings', settingsRouter);
app.use('/collector', collectorRouter);
app.use('/rewards', rewardsRouter);

app.use(function(req, res, next) {
    res.status(404).send({ message: "URL not found", success: false });
});

const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    const addr = server.address();
    const port = addr.port;
    console.log("Server started on port : " + port);
}