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
          address: true,
        },
      });
      return res.json(user);
    } catch (error) {
      console.error();
    }
  }
);
router.put(
  "/user/:userId",
  auth,
  async (
    req: Request<{
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
    }>,
    res: Response
  ) => {
    const { firstName, lastName, email } = req.body;
    const { userId } = req.params;

    try {
      const updateUser = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });

      return res.json(updateUser);
    } catch (error) {
      console.error();
    }
  }
);

module.exports = router;
