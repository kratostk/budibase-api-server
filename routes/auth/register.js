const express = require("express");
const router = express.router();
const { poolPromise } = require("../../config/dbConfig");

// REGISTER
router.post("/", async (req, res) => {
  //   const { username, password } = req.body;
  console.log("hit register route");
  console.log(req.body);
});

module.exports = router;
