const express = require("express");
const { check } = require("express-validator");
const {
  getNoteById,
  getNotesByUserId,
  createNote,
  updateNote,
  deleteNote,
  getAllNotes
} = require("../controllers/note-controllers");

const router = express.Router();

router.post("/new", createNote);

router.get("/all", getAllNotes);

router.get("/:nid", getNoteById);

module.exports = router;
