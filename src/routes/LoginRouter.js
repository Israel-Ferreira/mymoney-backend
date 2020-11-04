const {Router} = require('express')
const AuthService = require('../services/AuthService')


const router = Router()

router.post('/login', AuthService.login)
router.post('/signup', AuthService.signup)
router.post('/validate-token',  AuthService.validateToken)

module.exports = router