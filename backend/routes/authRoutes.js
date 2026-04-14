router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, bloodGroup, city } = req.body;

    // ✅ Validate all fields
    if (!name || !email || !phone || !password || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      bloodGroup,   // ✅ added
      city          // ✅ added
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error); // 👈 add this for debugging
    res.status(500).json({ error: error.message });
  }
});