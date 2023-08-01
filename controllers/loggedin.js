const { Sequelize } = require('sequelize');
const {user} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loggedin = async(req,res,next)=>{
    if(!req.cookies.userRegistered) return next() ;
    try {
        const decode = jwt.verify(req.cookie.userRegistered,process.env.ACCESS_TOKEN_SECRET);

        
    } catch (error) {
        
    }
}
// const loggedin 

module.exports = {loggedin}; 