import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("token");
    // const token = authHeader.split(" ")[1];
    console.log(token + "Inside Authorization middleware");

    if (!token) {
      console.log("fail");
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(token, "SecretSauce");

    req = payload.user;

    console.log("Authorized");
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json("Not Authorized");
  }
  next();
};
