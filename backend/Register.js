app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, city } = req.body;

    if (!name || !email || !password || !phone || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      phone,
      bloodGroup,
      city
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});