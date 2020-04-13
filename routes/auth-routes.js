const router = require("express").Router();
const passport = require("passport");

const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// /api/auth/google/redirect
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
