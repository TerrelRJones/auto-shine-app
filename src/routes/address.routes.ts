import { Address } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

import prisma from "../client";

router.post("/createAddress", async (req: Request<Address>, res: Response) => {
  const { state, city, street, addressId } = req.body;
  const zip = parseInt(req.body);

  const address = await prisma.address.create({
    data: {
      state,
      city,
      zip,
      street,
      addressId,
    },
  });

  return res.status(200).json(address);
});

router.delete("/deleteAddress/:id", async (req, res) => {
  const deletedAddress = prisma.address.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedAddress);
});

module.exports = router;