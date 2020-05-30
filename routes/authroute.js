const router = require('express').Router();

const {
    signUp,
    signIn
} = require('../controlllers/auth/AuthController')

router
    .route('/signup')
    .post(signUp)

router
    .route('/signin')
    .post(signIn)
module.exports = router;