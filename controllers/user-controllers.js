const User = require("../models/User");
const Mark = require("../models/Mark");
const Note = require("../models/Note");

const handleUserAuth = async ({ id, displayName, emails, provider }, done) => {
  const current = await User.findOne({ providerId: id });
  if (current) {
    console.log("USER EXISTS:", current);
    done(null, current);
  } else {
    const newUser = await new User({
      name: displayName,
      email: emails[0].value,
      providerId: id,
      provider
    });
    await newUser.save();

    console.log("NEW USER CREATED:", newUser);
    done(null, newUser);
  }
};

const handleDeserialize = async id => {
  const user = await User.findById(id);
  return user;
};

const getUserAll = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      403
    );
    return next(error);
  }

  const marks = await Mark.find({ author: userId });
  const notes = await Note.find({ author: userId });

  res.json({
    user: user.toObject({ getters: true }),
    marks,
    notes
  });
};

module.exports = { handleUserAuth, handleDeserialize, getUserAll };
