import express from "express";
import authRouters from "./routes/auth";
import subsRouters from "./routes/subs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

// mongodb connect
// as string to ts reconige MONGO_URI as string
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connect to DB");

    // json
    app.use(express.json());
    //cors
    app.use(cors());
    // router
    app.use("/auth", authRouters);
    app.use("/subs", subsRouters);
    app.listen(8080, () => {
      console.log(`Now you listen to the port 8080`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });
