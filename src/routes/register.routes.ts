import { Router, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const router: Router = Router();
import prisma from "../client";
import { User } from "@prisma/client";
import { body, validationResult } from "express-validator";

const bcrypt = require("bcrypt");

router.post(
  "/register",
  // username must be an email
  body("firstName").isString().isLength({ min: 1, max: 30 }),
  body("lastName").isString().isLength({ min: 1, max: 30 }),
  body("email").isEmail().withMessage("Must be in email format"),
  body("password")
    .isString()
    .isLength({ min: 5, max: 20 })
    .withMessage("password must be at least 5 characters long"),
  body("password2")
    .isString()
    .isLength({ min: 5, max: 20 })
    .withMessage("password must be at least 5 characters long"),
  async (req: Request<User>, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, password2 } = req.body;

    try {
      if (!firstName || !lastName || !email || !password || !password2) {
        return res.json({ error: "All fields required!" });
      }

      if (password !== password2) {
        return res.json({ error: "Passwords do not match" });
      }

      // bcrypt hashing password into db
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      const token = await jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "8hr",
      });

      return res
        .status(200)
        .json({ msg: "Registered!", userId: user.id, token: token });
    } catch (error) {
      return res.status(400);
    }
  }
);

module.exports = router;
