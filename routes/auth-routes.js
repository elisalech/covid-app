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
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
