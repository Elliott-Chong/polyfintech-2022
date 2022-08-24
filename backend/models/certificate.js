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
  },

  description: {
    type: String,
  },

  expiry: {
    type: Date,
  },
});
module.exports = mongoose.model("certificate", CertSchema);
