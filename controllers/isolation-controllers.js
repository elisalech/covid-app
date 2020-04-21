// const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const config = require("config");

const HttpError = require("../models/http-error");
const Isolation = require("../models/Isolation");
const User = require("../models/User");

const { getDate } = require("../helpers/app-helpers");

const createIsolation = async (req, res, next) => {
  console.log(req.body);
  const { comment, coords, externalImage } = req.body;
  const author = req.user.id;

  const image = req.file
    ? config.get("baseUrl") + req.file.path
    : externalImage;

  const cList = coords.split(",");

  const date = getDate();

  const createdIsolation = new Isolation({
    comment: comment.slice(0, 200),
    image: image,
    coords: {
      lat: cList[0],
      lng: cList[1],
    },
    author,
    date,
  });

  let user;
  try {
    user = await User.findById(author);
  } catch (err) {
    const error = new HttpError(
      "Creating isolation failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  console.log("isolation author:", user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdIsolation.save({ session: sess });
    user.isolations.push(createdIsolation);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log("ERROR", err);
    const error = new HttpError(
      "Creating isolation failed, please try again.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ isolation: createdIsolation.toObject({ getters: true }) });
};

const getAllIsolations = async (req, res) => {
  const isolations = await Isolation.find();

  const features = isolations.map((m, i) => {
    return {
      type: "Feature",
      id: i,
      geometry: { type: "Point", coordinates: [m.coords.lat, m.coords.lng] },
      properties: {
        id: m.id,
        label: "isolation",
      },
    };
  });

  res.status(201).json({ isolations: features });
};

const getIsolationById = async (req, res, next) => {
  const isolId = req.params.iid;

  let isolation;
  try {
    isolation = await Isolation.findById(isolId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find an isolation.",
      500
    );
    return next(error);
  }

  if (!isolation) {
    const error = new HttpError(
      "Could not find isolation for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    isolation: isolation.toObject({ getters: true }),
  });
};

module.exports = {
  createIsolation,
  getAllIsolations,
  getIsolationById,
};
