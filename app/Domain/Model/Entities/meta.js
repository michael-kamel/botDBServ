serviceLocator.registerModule('EntitiesValidationSchemas', function (joi)
{
    const LISTING_CATEGORY = joi.any().valid('Residential', 'Adminstrative', 'Commercial', 'Industrial', 'Other').required()
    const LISTING_LOCATION = joi.any().valid('6th of October', 'Abbassiya', 'Agouza', 'Al Rehab', 'Dokki', 'El Sadat City', 'El Salam City', 'El Sayeda Zeinab', 'El Shorouk City', 'El Tagammoa El Khames', 'Faisal', 'Gesr El Suez', 'Giza', 'El Haram', 'Heliopolis', 'Helwan', 'Imbaba', 'Katameya', 'Maadi', 'Madinaty', 'Manial', 'Sheraton', 'Mokattam', 'Nasr City', 'New Cairo', 'Sheikh Zayed', 'Shoubra', 'Smart Village', 'Zamalek').required()
    const LISTING_ADDRESS = joi.string().min(10)
    const LISTING_MIN_SIZE = 200
    const LISTING_MAX_SIZE = 2000
    const LISTING_MIN_PRICE = 10000000
    const CLIENT_PHONE_NUMBER = joi.string().regex(/[0-9]/).required()
    const OWNER_INFO = joi.object().keys(
                    {
                        name: joi.string().min(3).max(30).required(),
                        phone: CLIENT_PHONE_NUMBER,
                        email: joi.string().email().required()
                    }).required()
    const BUYER_INFO = OWNER_INFO
    const PREDEFINED = 
    {
        LISTING_CATEGORY,
        LISTING_LOCATION,
        LISTING_MIN_SIZE,
        LISTING_MAX_SIZE,
        LISTING_MIN_PRICE,
        LISTING_ADDRESS,
        CLIENT_PHONE_NUMBER,
        OWNER_INFO,
        BUYER_INFO
    }
    const Listing = joi.object().keys(
            {
                id: joi.any(),
                ownerInfo: PREDEFINED.OWNER_INFO,
                category: PREDEFINED.LISTING_CATEGORY,
                location: PREDEFINED.LISTING_LOCATION,
                address: PREDEFINED.LISTING_ADDRESS,
                space: joi.number().integer().min(PREDEFINED.LISTING_MIN_SIZE).max(PREDEFINED.LISTING_MAX_SIZE).required(),
                price: joi.number().integer().min(PREDEFINED.LISTING_MIN_PRICE).required(),
                description: joi.string()
            })
    const BuyerRequest = joi.object().keys(
            {
                id: joi.any(),
                listings: joi.array().items(Listing).required(),
                buyerInfo: PREDEFINED.BUYER_INFO,
            }).required()
    const ENITIIES_VALIDATION_SCHEMA = 
    {
            Listing,
            BuyerRequest
    }
    return ENITIIES_VALIDATION_SCHEMA
})