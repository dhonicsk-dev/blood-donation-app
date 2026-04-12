const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const auth = require("../middleware/auth");

// CREATE REQUEST
router.post("/requests", auth, async (req, res) => {
  const request = new Request({
    requesterId: req.user.userId,
    ...req.body,
  });

  await request.save();
  res.json(request);
});

// GET ALL REQUESTS
router.get("/requests", async (req, res) => {
  const data = await Request.find();
  res.json(data);
});

// UPDATE STATUS
router.patch("/requests/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;