import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnection.js';
import {errorMiddleware} from "./middlewares/error.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(
    cors({
      origin: ["https://jazzy-salamander-48bd97.netlify.app"],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/job", jobRouter);
  app.use("/api/v1/application", applicationRouter);

  dbConnection();

  app.use(errorMiddleware);

export default app;