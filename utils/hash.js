const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (plainTextPwd) => {
  try {
    const hashed = await bcrypt.hash(plainTextPwd, saltRounds);
    return hashed;
  } catch (err) {
    console.error(err);
  }
};

const compare = async (plainTextPwd, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainTextPwd, hashedPassword);
    return result; // <- boolean
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  hash,
  compare,
};
