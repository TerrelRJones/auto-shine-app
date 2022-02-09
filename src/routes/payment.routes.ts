import { Router, Request, Response } from "express";
import Stripe from "stripe";
import env from "dotenv";

env.config();
const auth = require("../middleware/authorization");

const SECRET_KEY: string = "sk_test_Kr5Zl2GzMklmlui8UFoPmqVO";

const stripe = new Stripe(SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const router: Router = Router();

router.post(
  "/create-payment-intent",
  auth,
  async (req: Request<{ price: string }>, res: Response) => {
    const { price } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(price), // 1099 lowest denomination stripe takes
        currency: "usd",
        payment_method_types: ["card"], // by default
      });

      const clientSecret = paymentIntent.client_secret;

      res.json({
        clientSecret: clientSecret,
      });
    } catch (error: any) {
      console.log(error.message);
      res.json({ error: error.message });
    }
  }
);

module.exports = router;
