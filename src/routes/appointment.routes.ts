import { Appointment } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

import prisma from "../client";

router.post(
  "/createAppointment",
  async (req: Request<Appointment>, res: Response) => {
    const { date, time, address, type, vehicle, appointmentId } = req.body;

    try {
      const appointment = await prisma.appointment.create({
        data: {
          date,
          time,
          address,
          type,
          vehicle,
          appointmentId,
        },
      });

      return res.status(200).json(appointment);
    } catch (error) {
      console.log(error);
      return res.json({ msg: "error setting appointment" });
    }
  }
);

router.get(
  "/appointment/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const appointment = await prisma.appointment.findMany({
      where: { appointmentId: id },
    });

    return res.status(200).json(appointment);
  }
);

router.delete("/cancelAppointment/:id", async (req: Request, res: Response) => {
  const deletedAppointment = await prisma.appointment.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedAppointment);
});

module.exports = router;
