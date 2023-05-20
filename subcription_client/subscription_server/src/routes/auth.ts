import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      const errors = validationError.array().map((err) => {
        return {
          msg: err.msg,
        };
      });

      res.json({errors});
    }

    const { email, password } = req.body;

    res.json({
      email,
      password,
    });
  }
);

export default router;
