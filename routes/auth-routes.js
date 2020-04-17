const router = require("express").Router();
const passport = require("passport");
const config = require("config");

const redirectUrl =
  process.env.NODE_ENV === "production"
    ? config.get("baseUrl")
    : "http://localhost:3000";

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(redirectUrl);
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
    successRedirect: redirectUrl,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
