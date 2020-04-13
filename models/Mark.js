const { Schema, model, Types } = require("mongoose");

const markSchema = new Schema({
  severity: { type: String, required: true },
  age: { type: Number },
  comment: { type: String },
  status: { type: String },
  symptoms: { type: String },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  author: { type: Types.ObjectId, required: true, ref: "User" },
  date: { type: String }
});

module.exports = model("Mark", markSchema);
