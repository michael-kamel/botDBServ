serviceLocator.registerModule('ParsingErrors', function (errorMaker) 
{
    const ParsingError = errorMaker('ParsingError')
    const SpecificationParsingError = errorMaker('SpecificationParsingError', ParsingError)
    const UnhandledSpecificationError = errorMaker('UnhandledSpecificationError', ParsingError)

    return {
        SpecificationParsingError,
        UnhandledSpecificationError
    }
})
