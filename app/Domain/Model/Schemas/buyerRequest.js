serviceLocator.inject(function(dbService) 
{
    const triggers = require('./triggers')
    const plugins = require('./plugins')
    const Schema = dbService.Schema
    let schema = Schema(
    {
        buyerInfo: 
        {
            name: {type: String, required: true},
            phone: {type: String, required: true},
            email: {type: String, required: true}
        },
        listings:[{type: Schema.Types.ObjectId, ref:'Listing'}]
    })
    schema.index({'buyerInfo.name': 1})
    schema.plugin(plugins.placeIdentifier)
    schema.pre('update', triggers.updateDates)

    serviceLocator.registerModule('BuyerRequestModel', function(dbService) 
    {
        
        return dbService.model('BuyerRequest', schema)
    })
})()