// important : this connection with atlas 
// just go to mongodb atlas 
// remember we will connect database with compass 
// this database is at - memories org(we can find it at view all org's), random project 
// and for the database access , our name is Aloke and pass is VEtuUDExmL82cRlm 


var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb+srv://Aloke:VEtuUDExmL82cRlm@cluster0.hqypvgf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});


// use - npm run start as there is a script  named start . 
// proof of its working 
// PS C:\Users\rekha\Downloads\Registration-and-Login-Form-in-Nodejs-and-MongoDB-master> npm run start    

// > creating-registration-and-login-form-in-nodejs-and-mongodb@1.0.0 start
// > node server.js

// Server is started on http://127.0.0.1:3000
// MongoDB Connection Succeeded.
// [Object: null prototype] {
//   email: 'aloke.geek@gmail.com',
//   username: 'rahul ',
//   password: '0987',
//   passwordConf: '0987'
// }
// if
// Success
// profile
// data
// {
//   _id: 6545fadf16745f05ccf85005,
//   unique_id: 2,
//   email: 'aloke.geek@gmail.com',
//   username: 'rahul ',
//   password: '0987',
//   passwordConf: '0987',
//   __v: 0
// }
// logout
// profile
// data
// {
//   _id: 6545fadf16745f05ccf85005,
//   unique_id: 2,
//   email: 'aloke.geek@gmail.com',
//   username: 'rahul ',
//   password: '0987',
//   passwordConf: '0987',
//   __v: 0
// }
// ^C^CTerminate batch job (Y/N)? ^C
// PS C:\Users\rekha\Downloads\Registration-and-Login-Form-in-Nodejs-and-MongoDB-master> 