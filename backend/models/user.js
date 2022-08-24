const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  organisation: {
    type: Boolean,
    default: false,
  },
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "certificate",
    },
  ],
});
module.exports = mongoose.model("user", UserSchema);
