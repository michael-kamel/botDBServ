module.exports = serviceLocator.inject(function (moment) 
{
    function updateDates (next) 
    {
        let currentDate = moment()
        next.dateUpdated = currentDate
        if (!next.createdAt) 
        {
            next.dateCreated = currentDate 
        }
        next()
    }
    return {
        updateDates
    }
})()
