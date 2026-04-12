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

    return res.json({ message: "Donor profile created" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// 🔹 SEARCH DONORS (GET)
exports.searchDonors = async (req, res) => {
  try {
    const search = req.query.search;

    let query = {};

    if (search && search.trim() !== "") {
      const value = search.trim();

      query = {
        $or: [
          { bloodGroup: { $regex: value, $options: "i" } },
          { city: { $regex: value, $options: "i" } },
          { userId: { $regex: value, $options: "i" } }
        ]
      };
    }

    const donors = await Donor.find(query);

    return res.json({
      success: true,
      count: donors.length,
      data: donors
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};