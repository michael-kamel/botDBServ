serviceLocator.registerModule('dbService', function (logger) 
{
    const mongoose = require('mongoose')
    mongoose.Promise = require('bluebird')
    mongoose.connect(process.env.DB_URI, { useMongoClient: true })
    logger.debug('DBService Started')
    return mongoose
})