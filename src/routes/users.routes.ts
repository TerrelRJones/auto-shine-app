import { Router, Request, Response } from "express";
const router: Router = Router();

import prisma from "../client";
const auth = require("../middleware/authorization");
// GET USERS with Vehicles attached

router.get(
  "/user/:userId",
  auth,
  async (req: Request<{ userId: string }>, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          vehicle: true,
        },
      });

      return res.json(user);
    } catch (error) {
      console.error();
    }
  }
);

module.exports = router;
