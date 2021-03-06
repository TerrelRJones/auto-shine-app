import { Appointment } from "@prisma/client";
import { Router, Request, Response } from "express";
const router: Router = Router();

const auth = require("../middleware/authorization");

import prisma from "../client";

router.post(
  "/appointment",
  auth,
  async (req: Request<Appointment>, res: Response) => {
    const { date, time, address, type, vehicle, comment, appointmentId } =
      req.body;

    try {
      const appointment = await prisma.appointment.create({
        data: {
          date,
          time,
          address,
          type,
          vehicle,
          comment,
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
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const appointment = await prisma.appointment.findMany({
      where: { appointmentId: id },
    });

    return res.status(200).json(appointment);
  }
);

router.delete("/appointment/:id", auth, async (req: Request, res: Response) => {
  const deletedAppointment = await prisma.appointment.delete({
    where: { id: req.params.id },
  });
  return res.status(200).json(deletedAppointment);
});

module.exports = router;
