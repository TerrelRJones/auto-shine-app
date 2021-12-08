import { Router, Request, Response } from "express";
const router: Router = Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router
  .route("/createVehicle")

  // CREATE Vehicle
  .post(
    async (
      req: Request<{}, {}, { make: string; model: string; vehicleId: number }>,
      res: Response
    ) => {
      const { make, model, vehicleId } = req.body;

      const vehicle = await prisma.vehicle.create({
        data: {
          make,
          model,
          vehicleId: Number(vehicleId),
        },
      });

      return res.status(200).json(vehicle);
    }
  );

module.exports = router;
