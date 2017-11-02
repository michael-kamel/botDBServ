const restify = require('restify')
const app = require('./Domain/app')
const validator = require('restify-joi-middleware')

let server = restify.createServer({version:process.env.VERSION})
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.gzipResponse())
server.use(validator())

app(server)

server.listen(process.env.PORT, serviceLocator.inject(function (logger) 
{
    logger.info('%s listening at %s', server.name, server.url)
})())