import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51NieQPSA1068KmYjb4ZeO1XDBGa24beBhQQ96b7HvRTrkuCYIy5vlj6hNSuTbUNkXZUbjtKhCqQB2P9MEI7exgXd00rq0rzqwS"
);

router.get("/", (req, res) => {
  res.send("stripe route");
});

router.post("/test-payments", async (req, res) => {
  const { amount, currency } = req.body;

  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

export default router;
