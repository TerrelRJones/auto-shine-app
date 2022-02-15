import { Address } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

const auth = require("../middleware/authorization");

import prisma from "../client";

router.post("/address", auth, async (req: Request<Address>, res: Response) => {
  const { state, city, street, zip, addressId } = req.body;

  const address = await prisma.address.create({
    data: {
      state: state,
      city: city,
      zip: parseInt(zip),
      street: street,
      addressId: addressId,
    },
  });

  return res.status(200).json(address);
});

router.get(
  "/address/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response) => {}
);

router.delete("/address/:id", auth, async (req, res) => {
  const deletedAddress = await prisma.address.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedAddress);
});

module.exports = router;
