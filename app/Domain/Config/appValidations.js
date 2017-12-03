serviceLocator.registerModule('appValidationSchemas', function (joi) 
{
    const PREDEFINED =
    {
        NAME: joi.string().min(3).max(30).required(),
        EMAIL: joi.string().email().required(),
        PHONE: joi.string().regex(/[0-9]/).required(),
        ADDRESS: joi.string().min(10).required(),
        LISTING_DESCRIPTION: joi.string().max(200).required(),
        LISTING_SPACE: joi.number().min(0).integer().required(),
        LISTING_PRICE: joi.number().min(0).integer().required(),
        LISING_CATEGORY: joi.any().valid('Residential', 'Adminstrative', 'Commercial', 'Industrial', 'Other').required(),
        LISING_LOCATION: joi.any().valid('6th of October', 'Abbassiya', 'Agouza', 'Al Rehab', 'Dokki', 'El Sadat City', 'El Salam City', 'El Sayeda Zeinab', 'El Shorouk City', 'El Tagammoa El Khames', 'Faisal', 'Gesr El Suez', 'Giza', 'El Haram', 'Heliopolis', 'Helwan', 'Imbaba', 'Katameya', 'Maadi', 'Madinaty', 'Manial', 'Sheraton', 'Mokattam', 'Nasr City', 'New Cairo', 'Sheikh Zayed', 'Shoubra', 'Smart Village', 'Zamalek').required()
    }

    const VALIDATION_SCHEMAS =
    {
        REMOVE_LISING_BY_ID: joi.object().keys(
        {
            query: joi.object().keys(
                {
                    id: joi.string().required()
                }).required()
        }),
        GET_LISTING_BY_ID: joi.object().keys(
        {
            query: joi.object().keys(
                {
                    id: joi.string().required()
                }).required()
        }),
        GET_LISTING_BY_SPECIFICATION: joi.object().keys(
        {
            query: joi.object().keys(
                {
                    category: PREDEFINED.LISING_CATEGORY,
                    location: PREDEFINED.LISING_LOCATION,
                    space: PREDEFINED.LISTING_SPACE,
                    price: PREDEFINED.LISTING_PRICE
                }).required()
        }),
        ADD_LISTING: joi.object().keys(
        {
            body: joi.object().keys(
                {
                    ownerInfo: joi.object().keys({
                        name: PREDEFINED.NAME,
                        phone: PREDEFINED.PHONE,
                        email: PREDEFINED.EMAIL
                    }).required(),
                    category: PREDEFINED.LISING_CATEGORY,
                    location: PREDEFINED.LISING_LOCATION,
                    address: PREDEFINED.ADDRESS,
                    space: PREDEFINED.LISTING_SPACE,
                    price: PREDEFINED.LISTING_PRICE,
                    description: PREDEFINED.LISTING_DESCRIPTION
                }).required()
        }),
        ADD_BUYER_REQUEST: joi.object().keys(
        {
            body: joi.object().keys(
            {
                buyerInfo: joi.object().keys(
                    {
                        name: PREDEFINED.NAME,
                        phone: PREDEFINED.PHONE,
                        email: PREDEFINED.EMAIL
                    }).required(),
                listings: joi.array().items(joi.string().required()).required()
            }).required()
        })
    }

    return VALIDATION_SCHEMAS
})
