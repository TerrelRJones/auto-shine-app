import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

router.post(
  "/login",
  async (req: Request<{ email: string; password: string }>, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      // TODO: Validate that users email exist

      // Return if user object is null.
      if (user === null) return;

      const validPassword = await bcrypt.compare(password, user.password);

      // authenticate user
      if (!validPassword) {
        return res.status(500).json("INCORRECRT PASSWORD. Please try again");
      }

      return res.status(200).json("Logged in!");
    } catch (error) {
      console.error();
      res.status(500).send(error);
    }
  }
);

module.exports = router;