serviceLocator.registerModule('buyerRequestCore', function (BuyerRequestRepository, restifyErrorManager)
{
    async function addBuyerRequest(req, res)
    {
        buyerRequest = await BuyerRequestRepository.toBuyerRequest(req.body)
        if(buyerRequest.listings.length > 0)
            await BuyerRequestRepository.save(buyerRequest)
        res.send(200, {success: true})
    }

    return {
        addBuyerRequest: restifyErrorManager.handler(addBuyerRequest),
    }
})