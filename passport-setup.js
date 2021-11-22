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
  async function (accessToken, refreshToken, profile, done) {
    if (profile.emails[0].value.indexOf('fpt.edu.vn')!=-1) {
      const checkAccount = await User.findOne({ email: profile.emails[0].value })
      console.log(checkAccount);
      if (checkAccount) {
        return done(null, profile);
      } else return done(null, false);
    }
  }
));
