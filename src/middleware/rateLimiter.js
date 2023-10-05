const  {RateLimiterMemory} = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
    points: 1,
    duration: 86400
});

const rateLimiterMiddleware = (req,res,next) => {
    const userId = req.ip;
    rateLimiter.consume(userId).then(()=> {
        next();
    }).catch((rejRes)=>{
        res.status(429).send('Too Many Requests');
    });
}


module.exports = rateLimiterMiddleware