serviceLocator.registerModule('Listing', function (joi, EntitiesValidationSchemas)
{
    class Listing
    {
        constructor(description)
        {
            this.ownerInfo = description.ownerInfo
            this.category = description.category,
            this.location = description.location,
            this.space = description.space
            this.price = description.price
            this.description = description.description
            this.id = null
        }
        setId(id)
        {
            this.id = id
        }

    }
    class ListingBuilder
    {
        constructor(){}
        ownerName(name)
        {
            this._ownerName = name
            return this
        }
        ownerPhone(phone)
        {
            this._ownerPhone = phone
            return this
        }
        ownerEmail(email)
        {
            this._ownerMail = email
            return this
        }
        category(category)
        {
            this._category = category
            return this
        }
        location(location)
        {
            this._location = location
            return this
        }
        space(space)
        {
            this._space = space
            return this
        }
        price(price)
        {
            this._price = price
            return this
        }
        description(description)
        {
            this._description = description
            return this
        }
        getDescription()
        {
            return {
                ownerInfo:
                {
                    name:this._ownerName,
                    phone:this._ownerPhone,
                    email:this._ownerMail
                },
                category:this._category,
                location:this._location,
                space:this._space,
                price:this._price,
                description:this._description
            }
        }
        build()
        {
            return new Listing(this.getDescription())
        }
    }
    async function validate(listingBuild, message)
    {
        await joi.assert(listingBuild.getDescription(), EntitiesValidationSchemas.Listing, message)
    }

    return{
        Entity:Listing,
        Builder:ListingBuilder,
        validate:validate
    }
})