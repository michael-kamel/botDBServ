serviceLocator.registerModule('EntitiesValidationSchemas', function (joi)
{
    const PREDEFINED = 
    {
        LISTING_CATEGORY: joi.any().valid('Residential', 'Adminstrative', 'Commercial', 'Industrial', 'Other').required(),
        LISTING_LOCATION: joi.any().valid('6th of October', 'Abbassiya', 'Agouza', 'Al Rehab', 'Dokki', 'El Sadat City', 'El Salam City', 'El Sayeda Zeinab', 'El Shorouk City', 'El Tagammoa El Khames', 'Faisal', 'Gesr El Suez', 'Giza', 'El Haram', 'Heliopolis', 'Helwan', 'Imbaba', 'Katameya', 'Maadi', 'Madinaty', 'Manial', 'Sheraton', 'Mokattam', 'Nasr City', 'New Cairo', 'Sheikh Zayed', 'Shoubra', 'Smart Village', 'Zamalek').required(),
        LISTING_MIN_SIZE: 200,
        LISTING_MAX_SIZE: 2000,
        LISTING_MIN_PRICE: 10000000,
        CLIENT_PHONE_NUMBER: joi.string().regex(/[0-9]/).required()
    }
    const ENITIIES_VALIDATION_SCHEMA = 
    {
            Listing:joi.object().keys(
            {
                ownerInfo: joi.object().keys(
                    {
                        name: joi.string().min(3).max(30).required(),
                        phone: PREDEFINED.CLIENT_PHONE_NUMBER,
                        email: joi.string().email().required()
                    }),
                category: PREDEFINED.LISTING_CATEGORY,
                location: PREDEFINED.LISTING_LOCATION,
                space: joi.number().integer().min(PREDEFINED.LISTING_MIN_SIZE).max(PREDEFINED.LISTING_MAX_SIZE).required(),
                price: joi.number().integer().min(PREDEFINED.LISTING_MIN_PRICE).required(),
                description: joi.string()
            }),
    }
    return ENITIIES_VALIDATION_SCHEMA
})