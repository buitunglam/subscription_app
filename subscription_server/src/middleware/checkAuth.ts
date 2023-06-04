import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("authorization");
  console.log("token....", token);
  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
  token = token.split(" ")[1];

  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRETE as string
    )) as { email: string };
    req.user = user.email;
    next();
  } catch {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
};

export default checkAuth;
