const express = require("express");
const router = express.Router();

const { createDonor, searchDonors } = require("../controllers/donorController");

router.post("/donor", createDonor);
router.get("/donors", searchDonors);

module.exports = router;