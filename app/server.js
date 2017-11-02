if (process.env.NODE_ENV !== 'production') 
{
    require('dotenv').load() 
}

require('./utilSetup')
require('./servicesSetup')
require('./frameworkSetup')
