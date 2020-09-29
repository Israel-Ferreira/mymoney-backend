const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./config/database')



app.get('/', (req,res,next) => {
    res.send({message: "Olá"})
})


module.exports = app