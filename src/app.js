const express = require('express')
const bodyParser = require('body-parser')
const billingCycleRouter = require('./routes/routes')
const queryParser = require('express-query-int')

const cors = require('./config/Cors')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(queryParser())
app.use(cors)

require('./config/database')

app.use('/api', billingCycleRouter)


app.get('/', (req,res,next) => {
    res.send({message: "Olá"})
})


module.exports = app