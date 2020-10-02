const corsMiddleware =  (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers','Content-Type,Content-Length, Authorization, Accept,X-Requested-With')

    next()
}

module.exports =  corsMiddleware