const express = require("express");
const router = express.Router();
const { poolPromise } = require("../../config/dbConfig");
const sql = require("mssql");

// LOGIN
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("hit login route");
  console.log(username, password);

  res.status(200);

  // try {
  //   const pool = await poolPromise;
  //   const result = await pool
  //     .request()
  //     .input("Username", sql.NVarChar(100), username)
  //     .execute("CHECKUSER");

  //   console.log(result);
  // } catch (err) {}
});
module.exports = router;
