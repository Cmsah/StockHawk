const { response } = require("express");
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

exports.landingpage = (req,res)=>{
    res.sendFile('landingpage.html',{root:'./views/'});
}

exports.add_investment = (req,res)=>{
    res.render('add-investment');
}

exports.login = (req,res)=>{
    res.sendFile("login.html",{root:'./views/'});
}
exports.register = (req,res)=>{
    res.sendFile("register.html",{root:'./views/'});
}
exports.update_investment = (req,res)=>{
    res.render('update-investment');
}
exports.portfolio = async(req,res)=>{
    

    console.log('portfolio:',req.cookies.userRegistered);
    // console.log(req.headers);
   try {
      console.log('AST:',process.env.ACCESS_TOKEN_SECRET);
      const token = req.cookies.userRegistered;
    //   const userId = jwt.verify(req.cookies.userRegistered,process.env.ACCESS_TOKEN_SECRET);
    
    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        );
    console.log(decoded);

    // making a get request to the get all transactions api
    // axios.get('http://localhost:3500/api/transaction');
    const url = 'http://localhost:3500/api/transaction';
    fetch(url, {
        method: 'GET', 
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          console.log('fetch response:',data);
          return res.render('index',{users:data});
      })
   } catch (error) {
       console.log(error);
       res.status(500).json({message:"some thing went wrong in the render.portfolio controller"});
   }
}