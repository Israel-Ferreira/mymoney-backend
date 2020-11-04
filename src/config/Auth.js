const jwt = require('jsonwebtoken')



module.exports =  (req,res, next) => {
    const AUTH_SECRET = process.env.AUTH_SECRET
    if(req.method === 'OPTIONS'){
        next()
    }else{
        const token =  req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'] || req.headers['x-access-token']


        console.log(token)

        if(!token){
            res.status(403).send({errors: ['No token provided.']})
        }

        jwt.verify(token,AUTH_SECRET, (err, decoded) => {
            console.log(decoded)
            if(err){
                console.log(err)
                res.status(403).send({errors: ['Failed to authenticate token.']})
            }else{
                req.decoded = decoded
                next()
            }
        })
    }
}


