serviceLocator.registerModule('listingCore', function (ListingRepository, Specification, Listing, restifyErrorManager)
{
    async function getListingById(req, res)
    {
        let listing = await ListingRepository.getById(req.query.id)
        res.send(200, {success: true, data:{listing}})
    }
    async function getListingBySpecification(req, res)
    {
        let category = req.query.category
        let location = req.query.location
        let space = parseInt(req.query.space)
        let spaceRange =  space*(process.env.SPACE_RANGE/100)
        let minSpace = space - spaceRange
        let maxSpace = space + spaceRange
        let price = parseInt(req.query.price)
        let priceRange =  price*(process.env.PRICE_RANGE/100)
        let minPrice = price - priceRange
        let maxPrice = price + priceRange
        let priceSpecification = new Specification.Expression.Between('price', minPrice, maxPrice)
        let spaceSpecification = new Specification.Expression.Between('space', minSpace, maxSpace)
        let categorySpecification = new Specification.Expression.Equals('category', category)
        let locationSpecification = new Specification.Expression.Equals('location', location)
        let specification = priceSpecification.And(spaceSpecification).And(categorySpecification).And(locationSpecification)
        let listings = await ListingRepository.find(specification)
        res.send(200, {success:true, listings})
    }
    async function addListing(req, res)
    {
        listing = await ListingRepository.toListing(req.body)
        await ListingRepository.save(listing)
        res.send(200, {success: true})
    }
    async function removeListingById(req, res)
    {
        await ListingRepository.removeById(req.query.id)
        res.send(200, {success: true})
    }

    return {
        getListingById: restifyErrorManager.handler(getListingById),
        getListingBySpecification: restifyErrorManager.handler(getListingBySpecification),
        addListing: restifyErrorManager.handler(addListing),
        removeListingById: restifyErrorManager.handler(removeListingById),
    }
})