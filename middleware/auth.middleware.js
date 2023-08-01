const jwt = require('jsonwebtoken');
const {user} = require('../models');
require('dotenv').config();
const checkUserAuth = async(req,res,next)=>{
    console.log('Check User auth middleware');
    
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        token = authorization.split(' ')[1];
        console.log(token);
    }else{
        token = req.cookies.userRegistered;
        console.log(token);
    }
    if( !token){
        res.status(401).send({"status":"failed","message":"unauthorized User,No token"})
    }
        try {
            // parse the token
            
            // verify token
            const {userId} = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            console.log(userId);
            // get user from token
            req.user = await user.findAll({
                attributes:{exclude:['password']},
                where:{uuid:userId}
            })
            console.log('the requested user:',req.user);
            next();
            
        } catch (error) {
            console.log(error);
            
            res.status(401).send({"status":"failed","message": "unauthorized user "});

        }
    }
    


module.exports = {checkUserAuth};