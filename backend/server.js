require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(express.json());

// 🔥 FIX: allow frontend (important for Vercel later)
app.use(cors({
  origin: "*"
}));

/* ================== CONFIG ================== */
const PORT = process.env.PORT || 5000; // ✅ FIX for Render
const JWT_SECRET = process.env.JWT_SECRET;

/* ================== ROOT ROUTE (IMPORTANT) ================== */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================== DB CONNECT ================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("DB Error:", err));

/* ================== USER MODEL ================== */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bloodGroup: String,
  city: String,
  phone: String,
  role: { type: String, default: "donor" }
});

const User = mongoose.model("User", userSchema);

/* ================== AUTH MIDDLEWARE ================== */
const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token ❌" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Unauthorized ❌" });
  }
};

/* ================== ROUTES ================== */

// 🔹 Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, bloodGroup, city, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      city,
      phone
    });

    await user.save();

    res.json({ message: "User registered ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success ✅",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Get Profile
app.get("/api/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Search Donors
app.post("/api/donors", auth, async (req, res) => {
  try {
    const { bloodGroup, city } = req.body;

    const donors = await User.find({
      bloodGroup: new RegExp(`^${bloodGroup}$`, "i"),
      city: new RegExp(city, "i")
    }).select("-password");

    if (donors.length === 0) {
      return res.json({
        message: "No donors found ❌",
        data: []
      });
    }

    res.json({
      message: "Donors found ✅",
      count: donors.length,
      data: donors
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================== SERVER ================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});