const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    maxlength: 36,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  charIdNumber: {
    type: String,
    maxlength: 6,
    min: 5,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  credit: {
    type: Number,
    default: 0,
    min: 0,
    max: 3000,
  },
});

module.exports = mongoose.model("User", UserSchema);
