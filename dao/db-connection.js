const { MongoClient } = require('mongodb');
const logger = require('pino')();
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
console.log('env ---> ', env);
let dbCredentials = {
    dbUserName: 'dbUser',
    dbPassword: 'dbUser'
};
const connectionString = `mongodb+srv://${dbCredentials.dbUserName}:${dbCredentials.dbPassword}@cluster0.jywyd.mongodb.net/test`;
let movieCollection;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        logger.info('--- Connected to Database ---');
        const db = client.db('test');
        movieCollection = db.collection('movie');
    })
    .catch(error => logger.error('catch error ---> ', error));

const insertDocument = async (reqBody) => {
    try {
        logger.info(' -- Inside insertDocument Method -- ');
        const response = await movieCollection.insertOne(reqBody);
        return "success";
    } catch (error) {
        logger.error(" catch error ---> ", error);
        return "failure";
    }
};

const getDocument = async () => {
    try {
        logger.info(' -- Inside getDocument Method -- ');
        const response = await movieCollection.find().toArray();
        return response;
    } catch (error) {
        logger.error(" catch error ---> ", error);
        return "failure";
    }
};

const updateDocument = async (reqBody) => {
    try {
        logger.info(' -- Inside updateDocument Method -- ');
        const fieldName = { Multiplexes: reqBody.Multiplexes };
        const updatedData = {
            $set: {
                Multiplexes: reqBody.Multiplexes,
                movieName: reqBody.movieName
            }
        }
        const response = await movieCollection.findOneAndUpdate(fieldName, updatedData, {
            upsert: true
        });
        return "success";
    } catch (error) {
        logger.error(" catch error ---> ", error);
        return error;
    }
};

const deleteDocument = async (reqBody) => {
    try {
        logger.info(' -- Inside deleteDocument Method -- ');
        const fieldName = { Multiplexes: reqBody.Multiplexes };
        const response = await movieCollection.deleteOne(fieldName);
        if (response.deletedCount === 0) {
            return 'No Multiplexes to delete';
        }
        return "success";
    } catch (error) {
        logger.error(" catch error ---> ", error);
        return error;
    }
};

module.exports.insertDocument = insertDocument;
module.exports.getDocument = getDocument;
module.exports.updateDocument = updateDocument;
module.exports.deleteDocument = deleteDocument;