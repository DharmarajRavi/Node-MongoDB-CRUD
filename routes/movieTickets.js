const express = require('express');
const routing = express.Router();
const pathConstant = require('../constants/path-constants.js');
const constantsMsg = require('../constants/constants');
const logger = require('pino')();
const service = require('../services/movieTickets.js');
const _ = require('lodash');


routing.post(pathConstant.POST_MOVIE_TICKETS, async (req, res, next) => {
    try {
        logger.info(' -- Inside POST_MOVIE_TICKETS Routes Method -- ');
        const reqObj = req.body;
        if (reqObj && !_.isEmpty(reqObj)) {
            const data = await service.addMovieSeat(reqObj);
            res.status(200).json(data);
        } else {
            res.status(400).statusMessage(constantsMsg.BAD_REQUEST)
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

routing.get(pathConstant.GET_MOVIE_TICKETS, async (req, res, next) => {
    try {
        logger.info(' -- Inside GET_MOVIE_TICKETS Routes Method -- ');
        const data = await service.getMovieSeat();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

routing.put(pathConstant.UPDATE_MOVIE_TICKETS, async (req, res, next) => {
    try {
        logger.info(' -- Inside UPDATE_MOVIE_TICKETS Routes Method -- ');
        const reqObj = req.body;
        if (reqObj && !_.isEmpty(reqObj)) {
            const data = await service.updateMovieSeat(reqObj);
            res.status(200).json(data);
        } else {
            res.status(400).statusMessage(constantsMsg.BAD_REQUEST)
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

routing.delete(pathConstant.DELETE_MOVIE_TICKETS, async (req, res, next) => {
    try {
        logger.info(' -- Inside DELETE_MOVIE_TICKETS Routes Method -- ');
        const reqObj = req.body;
        if (reqObj && !_.isEmpty(reqObj)) {
            const data = await service.deleteMovieSeat(reqObj);
            res.status(200).json(data);
        } else {
            res.status(400).statusMessage(constantsMsg.BAD_REQUEST)
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = routing;