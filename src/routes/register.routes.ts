import { Router, Request, Response } from "express";
const router: Router = Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router
  .route("/register")

  // CREATE USR
  .post(
    async (
      req: Request<
        {},
        {},
        {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        }
      >,
      res: Response
    ) => {
      const { firstName, lastName, email, password } = req.body;

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          vehicle: {},
          address: {},
        },
      });

      return res.status(200).json(user);
    }
  )

  // EDIT USERS
  .put((req: Request, res: Response) => {
    return res.sendStatus(200);
  });

// GET USERS
router.get(":id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res.send(`user ${id} has not been found`);
});

// DELETE USERS
router.delete(":id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return res.send(`User ${id} has been`);
});

module.exports = router;
