const router = require("express").Router();
const passport = require("passport");
const config = require("config");

const REDIRECT_URL =
  process.env.NODE_ENV === "production"
    ? config.get("baseUrl")
    : "http://localhost:3000/";

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(REDIRECT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// /api/auth/google/redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: REDIRECT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
