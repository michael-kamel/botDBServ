serviceLocator.registerModule('dbService', function (logger) 
{
    const mongoose = require('mongoose')
    mongoose.Promise = require('bluebird')
    mongoose.connect(process.env.REMOTEHEROKU == 'true' ? "mongodb://namename:passpass@ds139735.mlab.com:39735/go-proj-db" : process.env.DB_AUTH === 'auth' ? process.env.DB_AURI : process.env.DB_URI, { useMongoClient: true })
    logger.debug('DBService Started')
    return mongoose
})