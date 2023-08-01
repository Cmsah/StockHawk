const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const path = require('path');
const {checkUserAuth} = require('../middleware/auth.middleware')

// route level middleware - to protect route
// router.use('/')
// public routes
router.post('/register',user.createUser);
router.post('/login',user.login);

// protected routes

router.post('/login',user.login);
router.get('/',user.getAllUsers)
router.get('/:uuid',user.getUserTransactions);
module.exports = router;