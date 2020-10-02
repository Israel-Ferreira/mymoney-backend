const restful =  require('node-restful')
const mongoose = restful.mongoose

const paginate = require('mongoose-paginate')

const CreditSchema = new mongoose.Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true, min: 0}
})


const DebitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true, min: 0},
    status: {type: String, required: false, uppercase: true, enum: ["PAGO", "PENDENTE", "AGENDADO"]}
})



const BillingCycleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    month: {type: Number, min: 1, max: 12, required: true},
    year:  {type: Number, min: 1970, max: 2910, required: true},
    credits: [CreditSchema],
    debits: [DebitSchema]
})


BillingCycleSchema.plugin(paginate)

module.exports = restful.model('BillingCycle', BillingCycleSchema)