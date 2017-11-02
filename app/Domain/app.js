module.exports = function (app) 
{
    app.pre(function(req, res, next)
    {
        if(process.env.ALLOWED_HEADER === 'disallow' && process.env.ALLOWED_HEADER_VAL !== req.headers.access)
            return
        next()
    })
    serviceLocator.inject(function (listingCore, appValidationSchemas) 
    {
        app.get({path: '/getlistingbyid', version:'1.0.0', validation:appValidationSchemas.GET_LISTING_BY_ID},  listingCore.getListingById)
        app.del({path: '/removelistingbyid', version:'1.0.0', validation:appValidationSchemas.REMOVE_LISTING_BY_ID},  listingCore.removeListingById)
        app.get({path: '/getlistingbyspec', version:'1.0.0', validation:appValidationSchemas.GET_LISTING_BY_SPECIFICATION},  listingCore.getListingBySpecification)
        app.post({path: '/addlisting', version:'1.0.0', validation:appValidationSchemas.ADD_LISTING}, listingCore.addListing)
    })()
}