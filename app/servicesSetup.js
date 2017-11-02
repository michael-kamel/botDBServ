const serviceLocator = require('./Lib/serviceLocator')
const path = require('path')
const globby = require('globby')
global.serviceLocator = serviceLocator
globby.sync
(
    [
        './app/Domain/Config/**/*.js',
        './app/Domain/Tools/**/*.js',
        './app/Domain/Errors/**/*.js',
        './app/Domain/Services/**/*.js',
        './app/Domain/Model/**/*.js',
        './app/Domain/Core/**/*.js'
    ]
).forEach(function (modulePath) 
{
    require(path.resolve(modulePath))
})
// serviceLocator.loadAll()
