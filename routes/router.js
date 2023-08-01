const express = require('express');
const router = express.Router();
const render = require('../controllers/render');
const path = require('path');
const loggedin = require('../controllers/loggedin')

router.get('/',render.landingpage)

router.get('/login',render.login);
router.get('/register',render.register);
router.get('/portfolio',render.portfolio);
// router.get('/',loggedin,render.homeRoutes);

router.get('/update-investment',render.update_investment);
router.get('/add-investment',render.add_investment);

module.exports = router;