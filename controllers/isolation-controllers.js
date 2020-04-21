// const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Isolated = require("../models/Isolated");
const User = require("../models/User");

const { getDate } = require("../helpers/app-helpers");

const createIsolation = async (req, res, next) => {
  console.log(req.body);
  const { comment, coords, externalImage } = req.body;
  const author = req.user.id;

  const image = req.file ? req.file.path : externalImage;

  const cList = coords.split(",");

  const date = getDate();

  const createdIsolated = new Isolated({
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
    await createdIsolated.save({ session: sess });
    user.isolations.push(createdIsolated);
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
    .json({ isolated: createdIsolated.toObject({ getters: true }) });
};

module.exports = {
  createIsolation,
};
