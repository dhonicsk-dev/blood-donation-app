const express = require("express");
const router = express.Router();

let donors = [];

// create donor
app.post("/api/donor", auth, async (req, res) => {
  try {
    const { name, bloodGroup, city } = req.body;

    const donor = new Donor({
      name,
      bloodGroup,
      city
    });

    await donor.save();

    res.json({ message: "Donor added successfully ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get donors
router.get("/", (req, res) => {
  res.json(donors);
});

module.exports = router;