const express = require("express");
const router = express.Router();
const { poolPromise } = require("../../config/dbConfig");
const sql = require("mssql");
const AuthError = require("../../error/AuthError");

/**
 * @next with param is pretify error that send to the client
 * server still needs proper logger to save what happens in the mean time.
 *
 */

// LOGIN
router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);

  if (!username || !password) {
    return next(AuthError.badRequest("Invalid credentials!"));
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Username", sql.NVarChar(100), username)
      .execute("CHECKUSER");

    console.log(result);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
