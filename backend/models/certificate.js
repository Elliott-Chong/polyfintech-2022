const mongoose = require("mongoose");

const CertSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  date_of_issue: {
    type: Date,
    required: true,
    default: Date.now,
  },

  description: {
    type: String,
  },

  expiry: {
    type: Date,
  },
  issuer: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "user",
  },
  grade: {
    type: String,
  },
});
module.exports = mongoose.model("certificate", CertSchema);
