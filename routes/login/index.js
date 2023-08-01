// const express = require('express');
// const router = express.Router();
// const path = require('path');
// router.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','..','views','login.html'));
// });
// router.post('/',(req,res)=>{
//     // req.body contains the key/value pairs of data submitted 
//     // it is undefined initially but is populated with body parts by middleware 
//     // express.json() and urlencoded
//     // the . username and .password corresponds to the name attribute in the html form
//     res.send(`your username is ${req.body.username}
//               your password is ${req.body.password}`);

// })

// module.exports = router;