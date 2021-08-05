const express = require('express');
const app = express();
const logger = require('pino')();
const pathConstant = require('./constants/path-constants.js');
const routes = require('./routes');

// req body
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 }));

app.use((req, res, next) => {
    logger.info(' -- Routes hitted -- ');
    next();
});

app.use(pathConstant.ROOT_PATH, routes.movieTickets);

app.use('*', (req, res, next) => {
    logger.info(' -- Invalid URL -- ');
    res.status(404).json({ 'message': 'Invalid URL' });
});

app.listen(8080, () => {
    logger.info(' -- app listening on port no 8080 -- ');
});