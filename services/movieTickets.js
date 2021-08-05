const logger = require('pino')();
const collection = require('../dao/db-connection');

// Adding items to mongoDB
exports.addMovieSeat = async (reqObj) => {
    try {
        logger.info(' -- Inside addMovieSeat service Method -- ');
        let response = await collection.insertDocument(reqObj);
        logger.info('--- success ---');
        const finalResp = {
            status: response,
            message: 'inserted'
        }
        return finalResp;
    } catch (err) {
        logger.error('catch error ---> ', error);
        return err;
    }
};

// Getting items from mongoDB
exports.getMovieSeat = async (reqObj) => {
    try {
        logger.info(' -- Inside getMovieSeat service Method -- ');
        let response = await collection.getDocument();
        logger.info('--- success ---');
        const finalResp = {
            status: 'success',
            data: response
        }
        return finalResp;
    } catch (err) {
        logger.error('catch error ---> ', error);
        return err;
    }
};

// Update items in mongoDB
exports.updateMovieSeat = async (reqObj) => {
    try {
        logger.info(' -- Inside updateMovieSeat service Method -- ');
        let response = await collection.updateDocument(reqObj);
        logger.info('--- success ---');
        const finalResp = {
            status: response,
            message: 'updated'
        }
        return finalResp;
    } catch (err) {
        logger.error('catch error ---> ', err);
        return err;
    }
};

// delete items from mongoDB
exports.deleteMovieSeat = async (reqObj) => {
    try {
        logger.info(' -- Inside deleteMovieSeat service Method -- ');
        let response = await collection.deleteDocument(reqObj);
        logger.info('--- success ---');
        const finalResp = {
            status: response,
            message: 'deleted'
        }
        return finalResp;
    } catch (err) {
        logger.error('catch error ---> ', err);
        return err;
    }
};