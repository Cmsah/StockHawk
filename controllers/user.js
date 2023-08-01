const { Sequelize } = require('sequelize');
const {user} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createUser = async (req,res)=>{

    const {username,password,email} = req.body;
    // console.log(user);
    console.log(username);
    console.log(password);
    console.log(email);
    if(!email || !username || !password)
       return res.json({status:"erros",error:"please enter all of the fields"});

    try{
        const uexist = await user.findAll({
            where:{username} 
        })
        const eexist = await user.findAll({
            where:{email}
        })
        console.log(eexist === true);
        console.log(uexist === true);

        if(eexist && !uexist){
            return res.json({message:'email already used to create an account'});
        }
        if(uexist === true){
            return res.json({message:'Username  already exists'});
        }
        
        const hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
        
        const userinfo = await user.create({username:username,password:hashedPassword,email:email});
        const savedUser = await user.findOne({
          where:{username}
        });

        const token = jwt.sign(
          {userId:savedUser.uuid},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn:'90d'});

        return res.status(201).send({"status":"success","message":"Registration Success","token":token});
    }catch(err){
        console.log(req.body);
        console.log(err);
        return res.status(500).send({"message":"Registration Failure"});
    }
}

const login = async(req,res)=>{
  const {username,password} = req.body;
  console.log(username);
  console.log(password);
  // console.log(email);

  if(!username || !password)
     return res.json({status:"erros",error:"please enter all of the fields"});

  try{

      const uexist = await user.findOne({
          where:{username} 
      });

      if(!uexist) 
        return res.json({status:"user does not exit"});
      console.log(uexist.password);
      const match = await bcrypt.compare(password,uexist.password);
      if(uexist === true || match === false){
          return res.json({message:'Incorrect username or password'});
      }
      
      const token = jwt.sign(
        {userId:uexist.uuid},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'90d'});
      const cookieOptions = {
        // 90 days in milliseconds
        maxAge:90*24*60*60*1000,
        httpOnly:true
      }
      console.log('login:',token);
      res.cookie('userRegistered',token,cookieOptions);
      return res.redirect('/portfolio')
      // return res.json({status:"success",success:"user loggedin"});

  }catch(err){
      console.log(req.body);
      console.log(err);
      return res.sendStatus(500).send({"message":"login failure"});
  }
}

const loggedin = async(req,res,next)=>{
  if(!req.cookies.userRegistered) return next() ;
  try {

      const decode = jwt.verify(req.cookie.userRegistered,process.env.ACCESS_TOKEN_SECRET);
      console.log(decode);
      console.log(decode.uuid);

      const uexist = await user.findAll({
        where:{uuid:decode.uuid} 
      });

      if(uexist === false) return next();
      
      console.log('req.user before assignment',req.user);
      req.user = uexist[0];
      console.log('req.user after assignment',req.user);
  } catch (error) {

      console.log(error);
      return next();
      
  }
}
const getAllUsers = async (req, res) => {
    try {
      const users = await user.findAll();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
}

const getUserTransactions = async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const userTransactions = await user.findOne({
        where: { uuid },
        include: 'Transactions',
      });
  
      return res.json(userTransactions);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
}
const loggedUser = async(req,res)=>{
    res.send({"user":req.user})

}
module.exports = {createUser,getAllUsers,getUserTransactions,login};