import express from "express";
import bodyParser from "body-parser";
import authRoute from "./api/routes/AuthRoute";
import emailRoute from "./api/routes/EmailRoute";
import errorMiddleware, { notFound } from "./api/middlewares/errorMiddleware";
import compression from "compression";
import helmet from "helmet";
import logger from "morgan";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(logger("dev"));

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/email/", emailRoute);
app.use(notFound);
app.use(errorMiddleware);

export default app;
