const express = require("express");
const router = express.Router();
const { poolPromise } = require("../../config/dbConfig");
const sql = require("mssql");
const AuthError = require("../../error/AuthError");
const { hash } = require("../../utils/hash");

// REGISTER
router.post("/", async (req, res, next) => {
  const { username, name, password, phone, email, priority } = req.body;

  if (!username || !name || !password || !phone || !email || !priority) {
    return next(AuthError.badRequest("Invalid credentials!"));
  }

  // Hash password
  const hashedPwd = await hash(password);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Username", sql.NVarChar(100), username)
      .input("EmpName", sql.NVarChar(100), name)
      .input("Phone", sql.Int, phone)
      .input("Email", sql.NVarChar(100), email)
      .input("Password", sql.NVarChar(100), hashedPwd)
      .input("Priority", sql.NVarChar(100), priority)
      .execute("insertUser");

    console.log(result);
    res.status(201).json({ message: "created user successfully!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
