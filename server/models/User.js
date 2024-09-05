const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  content: String,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Pdf = mongoose.model("Pdf", pdfSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Pdf };
