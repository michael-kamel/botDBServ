serviceLocator.registerModule('BuyerRequest', function (joi, EntitiesValidationSchemas)
{
    class BuyerRequest
    {
        constructor(description)
        {
            this.buyerInfo = description.buyerInfo
            this.listings = description.listings
        }
        setId(id)
        {
            this.id = id
        }
    }
    class BuyerRequestBuilder
    {
        constructor(){}
        buyerName(name)
        {
            this._buyerName = name
            return this
        }
        buyerPhone(phone)
        {
            this._buyerPhone = phone
            return this
        } 
        buyerEmail(email)
        {
            this._buyerMail = email
            return this
        }
        listings(listings)
        {
            this._listings = listings
            return this
        }
        getDescription()
        {
            return {
                buyerInfo:
                {
                    name:this._buyerName,
                    phone:this._buyerPhone,
                    email:this._buyerMail
                },
                listings:this._listings
            }
        }
        build()
        {
            return new BuyerRequest(this.getDescription())
        }
    }
    async function validate(listingBuild, message)
    {
        await joi.assert(listingBuild.getDescription(), EntitiesValidationSchemas.BuyerRequest, message)
    }

    return{
        Entity:BuyerRequest,
        Builder:BuyerRequestBuilder,
        validate:validate
    }
})