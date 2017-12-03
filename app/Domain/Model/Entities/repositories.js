serviceLocator.registerModule('ListingRepository', function (ListingModel, Listing, SpecificationTranslator, errorFilter, DBErrors) 
{
    const errorDecorator = errorFilter.filterMaker(DBErrors.DBError)
    async function toListing(meta)
    {
        let build = new Listing.Builder()
        build.ownerName(meta.ownerInfo.name).ownerPhone(meta.ownerInfo.phone).ownerEmail(meta.ownerInfo.email).category(meta.category).location(meta.location)
        .space(meta.space).category(meta.category).price(meta.price).description(meta.description).address(meta.address)
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
            address:listing.address,
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
        let resolvedListings = await util._.reduce(listings, async (acc, meta) => (await acc).concat(await toListing(meta)), Promise.resolve([]))
        return resolvedListings
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
        await getById(id)
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

serviceLocator.registerModule('BuyerRequestRepository', function (BuyerRequestModel, BuyerRequest, Listing, ListingRepository, errorFilter, DBErrors) 
{
    const errorDecorator = errorFilter.filterMaker(DBErrors.DBError)
    async function toBuyerRequest(meta)
    {
        let listings = []
        for(let i = 0; i < meta.listings.length; i++)
        {
            let id = meta.listings[i]
            try
            {
                let listing = await ListingRepository.getById(id)
                listings.push(listing)
            }
            catch(err)
            {
                if(!(err instanceof DBErrors.NotFound))
                    throw err
            }
        }
        let build = new BuyerRequest.Builder()
        build.buyerName(meta.buyerInfo.name).buyerPhone(meta.buyerInfo.phone).buyerEmail(meta.buyerInfo.email).listings(listings)
        await BuyerRequest.validate(build)
        let buyerRequest = build.build()
        buyerRequest.setId(meta._id)
        return buyerRequest
    }
    function fromBuyerRequest(buyerRequest)
    {
        return {
            _id:buyerRequest.id,
            buyerInfo:
            {
                name:buyerRequest.buyerInfo.name,
                phone:buyerRequest.buyerInfo.phone,
                email:buyerRequest.buyerInfo.email
            },
            listings:util._.map(buyerRequest.listings, listing => listing.id)
        }
    }

    async function getById(id)
    {
        let buyerRequest = await BuyerRequestModel.findById(id).exec()
        if(buyerRequest)
            return toBuyerRequest(buyerRequest)
        throw new DBErrors.NotFound(`Failed to find Buyer Request with id ${id}`)
    }
    async function save(buyerRequest)
    {
        let buyerRequestModel = fromBuyerRequest(buyerRequest)
        if(buyerRequest._id)
        {
            let saveListingsResult = util._.map(buyerRequest.Listings, ListingRepository.save)
            await Promise.all(saveListingsResult)
            await BuyerRequestModel.update({_id:buyerRequestModel._id}, buyerRequestModel).exec()
        }
        else
            await BuyerRequestModel.create(buyerRequestModel)
    }
    async function remove(buyerRequestModel)
    {
        return removeById(buyerRequestModel.id)
    }
    async function removeById(id)
    {
        await getById(id)
        await BuyerRequestModel.findByIdAndRemove(id).exec()
    }
    
    return {
        getById: errorDecorator(getById),
        save: errorDecorator(save),
        remove: errorDecorator(remove),
        removeById: errorDecorator(removeById),
        toBuyerRequest: errorDecorator(toBuyerRequest)
    }
})