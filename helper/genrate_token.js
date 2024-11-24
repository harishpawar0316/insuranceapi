require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.secretOrKey;
function generate_token(id) {
  try {
    return jwt.sign(id, JWT_KEY, );
  } catch (err) {
    console.log(err)
  }
}
module.exports = {
    generate_token
};
