const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageSrc: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  skillset: [{ type: String, required: true }],
  moreInfo: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;
