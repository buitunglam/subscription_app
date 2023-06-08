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

router.get("/", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });
  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user?.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRETE_KEY,
    }
  );
  if (!subscriptions.data.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;
  switch (plan) {
    case "Basic": {
      const articles = await Article.find({ access: "Basic" });
      return res.json({ articles });
    }
    case "Standard": {
      const articles = await Article.find({
        access: { $in: ["Basic", "Standard"] },
      });
      return res.json({ articles });
    }
    default: {
      const articles = await Article.find({});
      return res.json({ articles });
    }
  }
});

export default router;
