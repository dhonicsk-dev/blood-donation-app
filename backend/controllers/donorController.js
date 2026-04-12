const Donor = require("../models/Donor");

// 🔹 CREATE DONOR
exports.createDonor = async (req, res) => {
  try {
    const { userId, bloodGroup, city, lastDonationDate } = req.body;

    const donor = new Donor({
      userId,
      bloodGroup,
      city,
      lastDonationDate,
      isAvailable: true
    });

    await donor.save();

    res.json({ message: "Donor profile created" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// 🔹 SEARCH DONORS (FINAL FIXED VERSION)
exports.searchDonors = async (req, res) => {
  try {
    let bloodGroup = req.query.bloodGroup;
    let city = req.query.city;

    // Fix '+' issue
    if (bloodGroup) {
      bloodGroup = bloodGroup.replace(" ", "+");
    }

    console.log("Searching:", bloodGroup, city);

    // If no params → return all donors
    if (!bloodGroup && !city) {
      const allDonors = await Donor.find();
      return res.json(allDonors);
    }

    const donors = await Donor.find({
      bloodGroup: bloodGroup,
      city: city
    });

    res.json(donors);

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};