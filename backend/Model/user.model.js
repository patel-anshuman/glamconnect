const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  // isAdmin:{type:Boolean, default:true},
  resetToken: String,
  resetTokenExpiration: Date,
  role: { type: String, default: "user", enum: ["admin", "user"] },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
