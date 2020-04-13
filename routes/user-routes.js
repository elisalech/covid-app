const express = require("express");

const { getUserAll } = require("../controllers/user-controllers.js");

const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  console.log("authCheck req.user", req.user.userId);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user
  });
});

router.get("/:uid", getUserAll);

module.exports = router;
