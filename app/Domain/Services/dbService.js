serviceLocator.registerModule('dbService', function (logger) 
{
    const mongoose = require('mongoose')
    mongoose.Promise = require('bluebird')
    mongoose.connect("mongodb://namename:passpass@ds139735.mlab.com:39735/go-proj-db", { useMongoClient: true })
    logger.debug('DBService Started')
    return mongoose
})