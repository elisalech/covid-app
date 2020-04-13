const express = require("express");
const { check } = require("express-validator");
const {
  getMarkById,
  getMarksByUserId,
  createMark,
  updateMarkStatus,
  deleteMark,
  getAllMarks,
} = require("../controllers/mark-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post("/status/:mid", updateMarkStatus);

router.post("/new", fileUpload.single("image"), createMark);

router.get("/all", getAllMarks);

router.get("/:mid", getMarkById);

module.exports = router;
