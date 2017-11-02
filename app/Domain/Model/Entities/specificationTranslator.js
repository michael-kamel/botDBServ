serviceLocator.registerModule('SpecificationTranslator', function (Specification, ParsingErrors) 
{
    async function toExpression(specification)
    {
        if(!(specification instanceof Specification.Specification))
            throw new ParsingErrors.SpecificationParsingError(`Can not resolve specification: ${specification}`)
        switch(specification.constructor)
        {
            case Specification.Compose.AndSpecification:
            {
                let leftExp = await toExpression(specification.LeftSpecification)
                let rightExp = await toExpression(specification.RightSpecification)
                return { $and: [leftExp, rightExp]}
            }
            case Specification.Compose.OrSpecification:
            {
                let leftExp = await toExpression(specification.LeftSpecification)
                let rightExp = await toExpression(specification.RightSpecification)
                return { $or: [leftExp, rightExp]}
            }
            case Specification.Compose.NotSpecification:
            {
                throw new ParsingErrors.UnhandledSpecificationError(Specification)
            }
            case Specification.Expression.LessThan:
            {
                return { [specification.AttrName]: {$lt: specification.Value} }
            }
            case Specification.Expression.MoreThan:
            {
                return { [specification.AttrName]: {$gt: specification.Value} }
            }
            case Specification.Expression.Equals:
            {
                return { [specification.AttrName]: specification.Value }
            }
            case Specification.Expression.Between:
            {
                return { [specification.AttrName]: {$lte: specification.Max, $gte: specification.Min}}
            }
        }
    }
    return {
        translate:toExpression
    }
})