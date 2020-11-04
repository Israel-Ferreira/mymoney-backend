const express = require('express')
const {Router} = require('express')
const bodyParser = require('body-parser')
const queryParser = require('express-query-int')



const auth =  require('./config/Auth')

const cors = require('./config/Cors')

const LoginRouter = require('./routes/LoginRouter')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(queryParser())
app.use(cors)

const protectedApi = Router()
app.use('/api', protectedApi)
protectedApi.use(auth)

require('./routes/routes')(protectedApi)


require('./config/database')

app.use('/oapi', LoginRouter)


app.get('/', (req,res,next) => {
    res.send({message: "Olá"})
})


module.exports = app