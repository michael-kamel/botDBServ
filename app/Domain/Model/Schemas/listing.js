serviceLocator.inject(function(dbService) 
{
    const triggers = require('./triggers')
    const plugins = require('./plugins')
    const Schema = dbService.Schema
    let schema = Schema(
    {
        ownerInfo: 
        {
            name: {type: String, required: true},
            phone: {type: String, required: true},
            email: {type: String, required: true}
        },
        category: {type: String, required: true},
        location: {type: String, required: true},
        space: {type: Number, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true}
    })
    schema.index({location: 1})
    schema.index({price: 1})
    schema.index({space: 1})
    schema.plugin(plugins.placeIdentifier)
    schema.pre('update', triggers.updateDates)

    serviceLocator.registerModule('ListingModel', function(dbService) 
    {
        
        return dbService.model('Listing', schema)
    })
})()