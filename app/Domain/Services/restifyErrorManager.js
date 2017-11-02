serviceLocator.registerModule('restifyErrorManager', function (logger) 
{
    function handler (func, context) 
    {
        return async function (req, res, next) 
        {
            try 
            {
                await func.call(context, req, res)
            }
            catch (err) 
            {
                logger.debug(err)
                switch(err.name)
                {
                    case 'Unauthorized':
                        {
                            res.send(401,  {msg:err.message, code:401})
                        } break
                    case 'RecordNotFound':
                        {
                            res.send(404,  {msg:err.message, code:404})
                        } break
                    case 'DBError':
                        {
                            res.send(500, {msg:'Internal Error', code:500})
                        } break
                    default:
                        {
                            res.send(500,  {msg:'Internal Error', code:500})
                        } break
                }
            }
        }
    }
    return {
        handler
    }
})
