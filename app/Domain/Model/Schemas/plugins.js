module.exports = serviceLocator.inject(function () 
{
    function placeIdentifier (schema) 
    {
        schema.virtual('id').get(function () 
        {
            return this._id.toHexString()
        })
        schema.set('toJSON',
            {
                virtuals: true
            })
    }

    return {
        placeIdentifier
    }
})()
