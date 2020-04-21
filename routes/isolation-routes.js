const express = require("express");
const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
const {
  createIsolation,
  getAllIsolations,
  getIsolationById,
} = require("../controllers/isolation-controllers");

const router = express.Router();

router.post("/new", fileUpload.single("image"), createIsolation);

router.get("/all", getAllIsolations);

router.get("/:iid", getIsolationById);

module.exports = router;
