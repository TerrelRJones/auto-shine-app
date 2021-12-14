import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

interface regUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

router.post("/register", async (req: Request<regUser>, res: Response) => {
  const { firstName, lastName, email, password, password2 } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !password2) {
      res.sendStatus(400);
      return;
    }

    if (password !== password2) {
      return res.send("Passwords do not match");
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

    return res.json(user);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
