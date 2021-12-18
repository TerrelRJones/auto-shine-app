import { Vehicle } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

import prisma from "../client";

router.post("/createVehicle", async (req: Request<Vehicle>, res: Response) => {
  const { year, make, model, vehicleId } = req.body;

  const vehicle = await prisma.vehicle.create({
    data: {
      year,
      make,
      model,
      vehicleId,
    },
  });

  return res.status(200).json(vehicle);
});

router.delete("/deleteVehicle/:id", async (req, res) => {
  const deletedVehicle = prisma.vehicle.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedVehicle);
});

module.exports = router;
