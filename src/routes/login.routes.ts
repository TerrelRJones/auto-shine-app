import { Router, Request, Response } from "express";
const jwt = require("jsonwebtoken");

const router: Router = Router();
import prisma from "../client";

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
      if (!user) {
        return res.json({ msg: "User does not exist." });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      // authenticate user
      if (!validPassword) {
        return res
          .status(500)
          .json({ error: "INCORRECRT PASSWORD. Please try again" });
      }

      const token = await jwt.sign(user, "SecretSauce", {
        expiresIn: "8hr",
      });

      return res
        .status(200)
        .json({ msg: "Logged in!", userId: user.id, token: token });
    } catch (error) {
      console.error();
      res.status(500).send(error);
    }
  }
);

module.exports = router;
