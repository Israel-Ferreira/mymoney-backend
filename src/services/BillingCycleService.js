const ErrorHandler = require('../helpers/ErrorHandler')
const BillingCycle = require('../models/BillingCycle')
const BillingCycleRepository = require('../repositories/BillingCycleRepository')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', ErrorHandler).after('put', ErrorHandler)


BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if (!err) {
            res.json(docs)
        } else {
            res.status(500).json({ errors: [err] })
        }
    })
})


BillingCycle.route('count', (req, res, next) => {
    BillingCycle.countDocuments((err, value) => {
        if (err) {
            res.status(500).json({ errors: [err] })
        } else {
            res.json({ value })
        }
    })
})



BillingCycle.route('summary',(req, res, next) => {
    BillingCycleRepository.summary()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})




module.exports = BillingCycle
