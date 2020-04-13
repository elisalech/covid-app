const router = require("express").Router();
const passport = require("passport");
const config = require("config");

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(config.get("baseUrl"));
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
    successRedirect: config.get("baseUrl"),
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
