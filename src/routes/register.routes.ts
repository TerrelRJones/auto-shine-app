import { Router, Request, Response } from "express";
// import jwtGenerator from "../utils/jwtGenerator";

const router: Router = Router();
import prisma from "../client";
import { User } from "@prisma/client";

const bcrypt = require("bcrypt");

router.post("/register", async (req: Request<User>, res: Response) => {
  const { firstName, lastName, email, password, password2 } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !password2) {
      res.sendStatus(400).json({ error: "All fields required!" });
      return;
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

    // const newWser = await prisma.user.findUnique({ where: { email: email } });

    // if (newWser === null) return res.json({ error: "No user found" });

    // // //token
    // const token: string = jwtGenerator(newWser.id, newWser.email);

    return res.json(user).sendStatus(200);
  } catch (error) {
    return res.status(400);
  }
});

module.exports = router;
