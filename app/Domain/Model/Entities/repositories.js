serviceLocator.registerModule('ListingRepository', function (ListingModel, Listing, SpecificationTranslator, errorFilter, DBErrors) 
{
    const errorDecorator = errorFilter.filterMaker(DBErrors.DBError)
    async function toListing(meta)
    {
        let build = new Listing.Builder()
        build.ownerName(meta.ownerInfo.name).ownerPhone(meta.ownerInfo.phone).ownerEmail(meta.ownerInfo.email).category(meta.category).location(meta.location)
        .space(meta.space).category(meta.category).price(meta.price).description(meta.description)
        await Listing.validate(build)
        let listing = build.build()
        listing.setId(meta._id)
        return listing
    }
    function fromListing(listing)
    {
        return {
            _id:listing.id,
            ownerInfo:
            {
                name:listing.ownerInfo.name,
                phone:listing.ownerInfo.phone,
                email:listing.ownerInfo.email
            },
            category:listing.category,
            location:listing.location,
            space:listing.space,
            price:listing.price,
            description:listing.description
        }
    }

    async function getById(id)
    {
        let listing = await ListingModel.findById(id).exec()
        if(listing)
            return toListing(listing)
        throw new DBErrors.NotFound(`Failed to find listing with id ${id}`)
    }
    async function find(specification)
    {
        let query = await SpecificationTranslator.translate(specification)
        let listings = await ListingModel.find(query).exec()
        listings.map(toListing)
        Promise.all(listings)
        return listings
    }
    async function save(listing)
    {
        let listingModel = fromListing(listing)
        if(listingModel._id)
            await ListingModel.update({_id:listingModel._id}, listingModel).exec()
        else
            await ListingModel.create(listingModel)
    }
    async function remove(listing)
    {
        return removeById(listing.id)
    }
    async function removeById(id)
    {
        await ListingModel.findByIdAndRemove(id).exec()
    }
    
    return {
        getById: errorDecorator(getById),
        find: errorDecorator(find),
        save: errorDecorator(save),
        remove: errorDecorator(remove),
        removeById: errorDecorator(removeById),
        toListing: errorDecorator(toListing)
    }
})