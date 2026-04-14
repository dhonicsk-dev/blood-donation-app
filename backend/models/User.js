const mongoose = require("mongoose");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  bloodGroup: String,
  city: String
});

module.exports = mongoose.model("User", userSchema);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const SECRET = "mysecretkey";

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashed
  });

  await user.save();

  res.json({ message: "User registered ✅" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token });
});