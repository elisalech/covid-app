// const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Note = require("../models/Note");
const User = require("../models/User");

const { getDate } = require("../helpers/app-helpers");

const getNoteById = async (req, res, next) => {
  const noteId = req.params.nid;

  let note;
  try {
    note = await Note.findById(noteId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a note.",
      500
    );
    return next(error);
  }

  if (!note) {
    const error = new HttpError(
      "Could not find note for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ note: note.toObject({ getters: true }) });
};

const getNotesByUserId = async (req, res, next) => {
  const userId = req.user.id;

  let userWithNotes;
  try {
    userWithNotes = await User.findById(userId).populate("notes");
  } catch (err) {
    const error = new HttpError(
      "Fetching notes failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithNotes || userWithNotes.notes.length === 0) {
    return next(
      new HttpError("Could not find notes for the provided user id.", 404)
    );
  }

  res.json({
    notes: userWithPlaces.places.map(place => place.toObject({ getters: true }))
  });
};

const createNote = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const { description, coords, title } = req.body;
  const author = req.user.id;

  const cList = coords.split(",");
  const date = getDate();

  const createdNote = new Note({
    description: description.slice(0, 200),
    coords: {
      lat: cList[0],
      lng: cList[1]
    },
    author,
    title: title.slice(0, 20),
    date
  });

  let user;
  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError("Creating note failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log("createNote author:", user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdNote.save({ session: sess });
    user.notes.push(createdNote);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log("ERROR", err);
    const error = new HttpError("Creating note failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ note: createdNote.toObject({ getters: true }) });
};

const updateNote = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const { status, comment } = req.body;
  const noteId = req.params.nid;

  let note;
  try {
    note = await Note.findById(noteId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update note.",
      500
    );
    return next(error);
  }

  if (note.author.toString() !== req.user.id) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }

  note.status = status;
  note.comment = comment;

  try {
    await note.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update note.",
      500
    );
    return next(error);
  }

  res.status(200).json({ note: note.toObject({ getters: true }) });
};

const deleteNote = async (req, res, next) => {
  const noteId = req.params.nid;

  let note;
  try {
    note = await Note.findById(noteId).populate("author");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!note) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  if (note.author.toString() !== req.user.id) {
    const error = new HttpError(
      "You are not allowed to delete this note.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await note.remove({ session: sess });
    note.author.notes.pull(note);
    await note.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete note.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted note." });
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find();

  const features = notes.map((n, i) => {
    return {
      type: "Feature",
      id: i,
      geometry: { type: "Point", coordinates: [n.coords.lat, n.coords.lng] },
      properties: {
        id: n.id,
        label: "note"
      }
    };
  });

  // const featuresData = { type: "FeatureCollection", features };

  res.status(201).json({ notes: features });
};

module.exports = {
  getNoteById,
  getNotesByUserId,
  createNote,
  updateNote,
  deleteNote,
  getAllNotes
};
