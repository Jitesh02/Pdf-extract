const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const secret = "alphaMale@97";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1h",
    });
    // console.log(token)
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
