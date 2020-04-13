const { Schema, model, Types } = require("mongoose");
const noteSchema = new Schema({
  description: { type: String },
  title: { type: String },
  address: { type: String },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  author: { type: Types.ObjectId, required: true, ref: "User" },
  date: { type: String }
});

module.exports = model("Note", noteSchema);
