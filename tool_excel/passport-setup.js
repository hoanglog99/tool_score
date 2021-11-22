const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./model/User')

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
return user
});

passport.use(new GoogleStrategy({
  clientID: "1045133608496-dpjrmemlf8k5qctns92bb5bhgev7f4vo.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile.emails);
    return done(null, {email:profile.emails[0].value});
  }
));