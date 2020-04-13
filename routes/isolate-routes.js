const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
const { createIsolated } = require("../controllers/isolate-controllers");

const router = express.Router();

router.post("/new", fileUpload.single("image"), createIsolated);

module.exports = router;
