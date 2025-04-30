const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rare Disease Backend is running 🚀");
});

module.exports = router;
