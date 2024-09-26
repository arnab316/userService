const express = require('express');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes');
const bodyParser = require('body-parser');
const startAndStop = () => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api',apiRoutes)
    const port = PORT
    app.listen(port, () => {
      console.log(`User Service is running on port ${port}`);
    });
}

startAndStop();