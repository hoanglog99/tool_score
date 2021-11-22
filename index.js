const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup')

app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

const mongoDB = 'mongodb://localhost:27017/tool-excel';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = require('./model/User')

const isLogin = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.sendStatus(401)
  }
}
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/success');
  });

app.get('/', function (req, res) {
  return res.send('helloo! dang nhap di ban')
});

app.get('/success', isLogin, async function (req, res) {
  return res.send('dang nhap thanh cong')

})

app.listen(3000, function () {
  console.log('Node app is running on port 3000');
});
module.exports = app;
