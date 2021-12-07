import { Router, Request, Response } from "express";
const router: Router = Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router
  .route("/user")

  // GET USERS
  .get((req: Request, res: Response<{ name: string }>) => {
    return res.json({
      name: "Terrel",
    });
  })

  // CREATE USR
  .post(
    async (
      req: Request<{}, {}, { name: string; email: string }>,
      res: Response
    ) => {
      const { name, email } = req.body;

      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
        },
      });

      return res.status(200).json(user);
    }
  )

  // EDIT USERS
  .put((req: Request, res: Response) => {
    return res.sendStatus(200);
  });

// DELETE USERS
router.delete(
  "/user/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.send(`User ${id} has been`);
  }
);

module.exports = router;
