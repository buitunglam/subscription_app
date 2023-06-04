import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import checkAuth from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";
const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").isLength({ min: 5 }).withMessage("The password is invalid"),
  async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      const errors = validationError.array().map((err) => {
        return {
          msg: err.msg,
        };
      });

      return res.status(404).json({ errors, data: null });
    }

    const { email, password } = req.body;

    // check duplicate email
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    }

    // hash password
    const hashPasword = await bcrypt.hash(password, 10);
    // create customer id in stripe
    const customer = await stripe.customers.create(
      {
        email: email,
      },
      {
        apiKey: process.env.STRIPE_SECRETE_KEY,
      }
    );
    console.log("customer stripe...", customer);

    // create new user
    const newUser = await User.create({
      email,
      stripeCustomerId: customer.id,
      password: hashPasword,
    });
    // create token
    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRETE as string,
      {
        expiresIn: 36000,
      }
    );

    return res.status(200).json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          stripeCustomerId: customer.id,
        },
      },
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // check user
  if (!user) {
    return res.status(401).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
      data: null,
    });
  }

  // check match password
  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    return res.status(403).json({
      errors: [
        {
          msg: "password is not correct",
        },
      ],
      data: null,
    });
  }

  // create token
  const token = await JWT.sign(
    { email: user.email },
    process.env.JWT_SECRETE as string,
    {
      expiresIn: 36000,
    }
  );

  return res.status(200).json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId
      },
    },
  });
});

// me route
router.get("/me", checkAuth, async (req, res) => {
  const email = req.user;
  const userInfo = await User.findOne({ email });
  res.json({
    errors: [],
    data: {
      user: {
        id: userInfo?.id,
        email: userInfo?.email,
        stripeCustomerId: userInfo?.stripeCustomerId,
      },
    },
  });
});

export default router;
