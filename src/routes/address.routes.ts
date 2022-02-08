import { Address } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

import prisma from "../client";

router.post("/createAddress", async (req: Request<Address>, res: Response) => {
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
  "/getAddress/:id",
  async (req: Request<{ id: string }>, res: Response) => {}
);

router.delete("/deleteAddress/:id", async (req, res) => {
  const deletedAddress = await prisma.address.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedAddress);
});

module.exports = router;
