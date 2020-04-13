const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  providerId: { type: Number },
  provider: { type: String },
  notes: [{ type: Types.ObjectId, ref: "Note" }],
  marks: [{ type: Types.ObjectId, ref: "Mark" }],
  isolations: [{ type: Types.ObjectId, ref: "Isolated" }],
});

module.exports = model("User", userSchema);
