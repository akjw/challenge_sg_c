const express = require("express");
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('./config/passportConfig')
const server = express();
const session = require("express-session");
const flash = require('connect-flash');
require("dotenv").config();


/*
Connect to MongoDB
*/
mongoose.connect(process.env.MONGODBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
},
  () => {
      console.log('MongoDB connected!')
  }
);

/* Middleware */
server.use(express.urlencoded({ extended: true })) //collects form data
server.set('view engine', 'ejs'); //view engine setup
server.use(expressLayouts);

/*-- These must be place in the correct place */
server.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 }
  })
);
//-- passport initialization
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function(request, response, next) {
  // before every route, attach the flash messages and current user to res.locals
  response.locals.alerts = request.flash();
  response.locals.currentUser = request.user;
  next();
});

server.use('/auth', require('./routes/auth.route'))
server.use('/list', require('./routes/list.route'))
// app.use('/', isLoggedIn, require('./routes/restaurant.route'))

server.listen(process.env.PORT, () =>
  console.log(`connected to express on ${process.env.PORT}`)
);
