/* ###################### BEGIN - DEFAULT SETTINGS ###################### */
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const messageHdz = require('hp-message');
const app = express();
//DB Config
const db = require('./config/database');
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
})
.then(() => {
  console.log('MONGODB connected');
  global.isDbConnected = true;
})
.catch(err => {
  console.error(err); 
  global.isDbConnected = false;  
}); 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Global Declarations
global.instantiateMessage = messageHdz.createObjMsg;
/* ###################### END - DEFAULT SETTINGS ###################### */


/* ###################### SPECIFIC MICROSERVICE SETTINGS ###################### */
app.use('/api/address', require('./routes/address'));
app.use('/api/address/provinces', require('./routes/provinces'));
app.use('/api/address/cities', require('./routes/cities'));
app.use('/api/address/nationalities', require('./routes/nationality'));
app.use('/api/address/geo', require('./routes/geo'));
const port = process.env.PORT || 5002;
app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
}); 