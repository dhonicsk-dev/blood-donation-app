const Request = require("../models/Request");

// Create blood request
exports.createRequest = async (req, res) => {
  try {
    const { requesterId, bloodGroup, city, hospital } = req.body;

    const request = new Request({
      requesterId,
      bloodGroup,
      city,
      hospital
    });

    await request.save();

    res.json({ message: "Blood request created" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};