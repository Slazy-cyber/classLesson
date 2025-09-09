const express = require('express');
const router = express.Router();
const { getSignup, postRegister, getSignIn, getDashboard, postLogin } = require('../controllers/user.controller');



router.get('/signup',getSignup)
router.post('/register', postRegister)

router.get('/signin', getSignIn)
router.post('/signin',postLogin) 

router.get('/dashboard',getDashboard)

module.exports = router;