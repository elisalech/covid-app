const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
const { createIsolation } = require("../controllers/isolation-controllers");

const router = express.Router();

router.post("/new", fileUpload.single("image"), createIsolation);

module.exports = router;
