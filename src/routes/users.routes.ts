import { Router, Request, Response } from "express";
const router: Router = Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET USERS with Vehicles attached
router.get(":id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        vehicle: true,
      },
    });

    return res.json(user);
  } catch (error) {
    console.error();
    return res.send(`user ${id} has not been found`);
    // return res.send(error);
  }
});

module.exports = router;
