const express = require("express");
const router = express.Router();
const { poolPromise } = require("../../config/dbConfig");
const sql = require("mssql");
const AuthError = require("../../error/AuthError");
const { compare } = require("../../utils/hash");

/**
 * @next with param is pretify error that send to the client
 * server still needs proper logger to save what happens in the mean time.
 *
 */

// LOGIN
router.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(AuthError.badRequest("Invalid credentials!"));
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Username", sql.NVarChar(100), username)
      .execute("CHECKLOGIN");

    if (!result.recordset) {
      return next(AuthError.unauthorize("Username not found!"));
    }

    // unhash & compare password
    const isPwdCorrect = await compare(password, result.recordset.Password);
    if (!isPwdCorrect) {
      return next(AuthError.unauthorize("Password incorrect!"));
    }

    console.log(result);
    res.status(200).json({
      username: result.recordset.Username,
      name: result.recordset.EmpName,
      email: result.recordset.Email,
      phone: result.recordset.Phone,
      priority: result.recordset.Priority,
    });
  } catch (err) {
    console.log(err); // TODO: Logger (prod.)
    next(err);
  }
});
module.exports = router;
