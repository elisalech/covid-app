const { Schema, model, Types } = require("mongoose");

const isolSchema = new Schema({
  comment: { type: String },
  address: { type: String },
  image: { type: String },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  author: { type: Types.ObjectId, required: true, ref: "User" },
  date: { type: String },
});

module.exports = model("Isolated", isolSchema);
