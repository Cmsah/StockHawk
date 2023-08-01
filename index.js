// if the sequalize is a constructor function then the first letter has to be uppercase
const {sequelize,user} = require('./models/index');
const login = require('./routes/login');
const path = require('path');
const express = require('express');
const app = express();
const db = require('./models');
const port = process.env.PORT || 3500;
const cookie = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load css assets
// app.use(express.static(path.join(__dirname, '/public')));
app.use('/css',express.static(path.resolve(__dirname,'public/css')));
app.use('/images',express.static(path.resolve(__dirname,'public/images')));
app.use('/js',express.static(path.resolve(__dirname,'public/js')));
// setting the view engine
app.set("view engine","ejs");
app.use(cookie());

// load routers
app.use('/',require('./routes/router'));
app.use('/user',require('./routes/user'));
app.use('/api/transaction',require('./routes/transaction'))
// app.use('/login', 'login');







app.listen(port,async()=>{
  console.log(`listening on port${port}`);
  await sequelize.authenticate();
  console.log('database Connected');
  
});