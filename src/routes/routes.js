const {Router} = require('express')
const BillingCycleService = require('../services/BillingCycleService')

const router = Router()

BillingCycleService.register(router, '/billingCycles')

module.exports = router