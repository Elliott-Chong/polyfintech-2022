const mongoose = require("mongoose");
const db =
  "mongodb+srv://elliott:elle1412@cluster0.psexorz.mongodb.net/polyfintech?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("elle error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
