const BillingCycle = require('../models/BillingCycle')

module.exports = {
    summary:  () => {
        return BillingCycle.aggregate([{
            $project: {
                credit: { $sum: "$credits.value" }, debt: { $sum: "$debits.value" }
            }
        }, {
            $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
        }, {
            $project: { _id: 0, credit: 1, debt: 1 }
        }])
        .then(result => result[0] || {credit: 0, debt: 0})
        .catch(err => {errors: [err]})
    }
}