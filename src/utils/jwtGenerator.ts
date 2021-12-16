const jwt = require("jsonwebtoken");
require("dotenv").config();

export default function jwtGenerator(id: string, email: string) {
  const payload = {
    email: email,
    user: id,
    time: Date.now(),
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8hr" });
}
