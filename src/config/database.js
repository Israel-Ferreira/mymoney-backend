const mongoose = require('mongoose')

const mongoOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}


module.exports = mongoose.connect('mongodb://localhost:17017/mymoney', mongoOptions)

