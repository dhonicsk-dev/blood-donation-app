const mongoose = require("mongoose");
const Donor = require("./models/Donor");
const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Donor", donorSchema);

app.post("/api/donor", auth, async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json({ message: "Saved ✅" });
});

app.get("/api/donors", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});