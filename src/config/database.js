const mongoose = require('mongoose')

const mongoOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

module.exports = mongoose.connect('mongodb://localhost:27017/mymoney', mongoOptions)
