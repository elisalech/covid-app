// const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Mark = require("../models/Mark");
const User = require("../models/User");

const { getDate } = require("../helpers/app-helpers");

const getMarkById = async (req, res, next) => {
  const markId = req.params.mid;

  let mark;
  try {
    mark = await Mark.findById(markId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a mark.",
      500
    );
    return next(error);
  }

  if (!mark) {
    const error = new HttpError(
      "Could not find mark for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    mark: mark.toObject({ getters: true }),
  });
};

const getMarksByUserId = async (req, res, next) => {
  const userId = req.user.id;

  let userWithMarks;
  try {
    userWithMarks = await User.findById(userId).populate("marks");
  } catch (err) {
    const error = new HttpError(
      "Fetching marks failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithMarks || userWithMarks.marks.length === 0) {
    return next(
      new HttpError("Could not find marks for the provided user id.", 404)
    );
  }

  res.json({
    marks: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createMark = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const { comment, symptoms, coords, severity, age } = req.body;
  const author = req.user.id;

  const cList = coords.split(",");

  const date = getDate();

  const createdMark = new Mark({
    comment: comment.slice(0, 200),
    symptoms: symptoms.slice(0, 200),
    coords: {
      lat: cList[0],
      lng: cList[1],
    },
    severity,
    age,
    status: "Infected",
    author,
    date,
  });

  let user;
  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError("Creating mark failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log("createMark author:", user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMark.save({ session: sess });
    user.marks.push(createdMark);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log("ERROR", err);
    const error = new HttpError("Creating mark failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ mark: createdMark.toObject({ getters: true }) });
};

const updateMarkStatus = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError("Invalid inputs passed, please check your data.", 422)
  //   );
  // }

  const { status } = req.body;
  const markId = req.params.mid;

  let mark;
  try {
    mark = await Mark.findById(markId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update mark.",
      500
    );
    return next(error);
  }

  if (mark.author.toString() !== req.user.id) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }

  mark.status = status;
  // mark.comment = comment;

  try {
    await mark.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update mark.",
      500
    );
    return next(error);
  }

  res.status(200).json({ mark: mark.toObject({ getters: true }) });
};

const deleteMark = async (req, res, next) => {
  const markId = req.params.mid;

  let mark;
  try {
    mark = await Mark.findById(markId).populate("author");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete mark.",
      500
    );
    return next(error);
  }

  if (!mark) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  if (mark.author.toString() !== req.user.id) {
    const error = new HttpError(
      "You are not allowed to delete this mark.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await mark.remove({ session: sess });
    mark.author.marks.pull(mark);
    await mark.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

const getAllMarks = async (req, res) => {
  const marks = await Mark.find();

  const features = marks.map((m, i) => {
    return {
      type: "Feature",
      id: i,
      geometry: { type: "Point", coordinates: [m.coords.lat, m.coords.lng] },
      properties: {
        id: m.id,
        label: "mark",
      },
    };
  });

  res.status(201).json({ marks: features });
};

module.exports = {
  getMarkById,
  getMarksByUserId,
  createMark,
  updateMarkStatus,
  deleteMark,
  getAllMarks,
};
