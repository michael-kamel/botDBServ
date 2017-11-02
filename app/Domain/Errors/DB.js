serviceLocator.registerModule('DBErrors', function (errorMaker) 
{
    const DBError = errorMaker('DBError')
    const NotFound = errorMaker('RecordNotFound', DBError)
    const Unauthorized = errorMaker('Unauthorized', DBError)
    const InvalidData = errorMaker('InvalidData', DBError)

    return {
        DBError,
        NotFound,
        Unauthorized,
        InvalidData
    }
})
