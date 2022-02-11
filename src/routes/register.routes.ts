import { Router, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const router: Router = Router();
import prisma from "../client";
import { User } from "@prisma/client";

const bcrypt = require("bcrypt");

router.post("/register", async (req: Request<User>, res: Response) => {
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

    const token = await jwt.sign(user, "SecretSauce", {
      expiresIn: "8hr",
    });

    return res
      .status(200)
      .json({ msg: "Registered!", userId: user.id, token: token });
  } catch (error) {
    return res.status(400);
  }
});

module.exports = router;
