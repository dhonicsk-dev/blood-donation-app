const express = require("express");
const router = express.Router();

let donors = [];

// create donor
router.post("/", (req, res) => {
  donors.push(req.body);
  res.json({ message: "Donor added" });
});

// get donors
router.get("/", (req, res) => {
  res.json(donors);
});

module.exports = router;