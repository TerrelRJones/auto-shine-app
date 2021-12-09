import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

router.post(
  "/register",
  async (
    req: Request<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      password2: string;
    }>,
    res: Response
  ) => {
    const { firstName, lastName, email, password, password2 } = req.body;

    if (password !== password2) {
      return res.send("Passwords do not match");
    }

    try {
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

      return res.status(200).json(user);
    } catch (error) {
      return res.send(error);
    }
  }
);

module.exports = router;
