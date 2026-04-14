const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ================== MONGODB ==================
mongoose.connect("mongodb+srv://kesavasaikalluri_db_user:Sairam123@cluster0.wxkd2xb.mongodb.net/bloodDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================== MODELS ==================

// Donor Model
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  city: String
});
const Donor = mongoose.model("Donor", donorSchema);

// User Model
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// ================== AUTH ==================

const SECRET = "mysecretkey";

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ================== ROUTES ==================

// Test
app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// 🔹 REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashed });
    await user.save();

    res.json({ message: "User registered" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// 🔹 ADD DONOR
app.post("/api/donor", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: "Donor added" });
  } catch {
    res.status(500).json({ error: "Error saving donor" });
  }
});

// 🔹 GET DONORS
app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch {
    res.status(500).json({ error: "Error fetching donors" });
  }
});

// 🔹 DELETE DONOR
app.delete("/api/donor/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

// ================== SERVER ==================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});