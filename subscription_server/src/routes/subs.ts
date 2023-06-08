import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import checkAuth from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
import Stripe from "stripe";
import Article from "../models/article";
const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
  const reponse: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRETE_KEY,
  });

  const prices = reponse?.data.filter((price: any): [] => price.active);

  res.json({
    prices,
  });
});

router.post("/sessions", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/articles",
      cancel_url: "http://localhost:3000/article-plans",
      customer: user?.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRETE_KEY,
    }
  );

  res.json({ session });
});

export default router;
