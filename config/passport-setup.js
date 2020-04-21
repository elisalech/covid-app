const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const config = require("config");
const User = require("../models/User");
const {
  handleUserAuth,
  handleDeserialize,
} = require("../controllers/user-controllers");

const clientID = config.get("clientID");
const clientSecret = config.get("clientSecret");

const CALLBACK_URL =
  process.env.NODE_ENV === "production" ? "http://localhost:5000/" : "/";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, await handleDeserialize(id));
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: `${CALLBACK_URL}api/auth/google/redirect`,
      clientID,
      clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("profile", profile);
      handleUserAuth(profile, done);
    }
  )
);
