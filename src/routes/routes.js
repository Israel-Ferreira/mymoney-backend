const BillingCycleService = require('../services/BillingCycleService')



module.exports = (router) => {
    BillingCycleService.register(router, '/billingCycles')
}