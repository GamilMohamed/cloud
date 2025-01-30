// app.ts
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import router from "./routes/index.route";
import { specs } from "./config/swagger.config";
import swaggerUi from "swagger-ui-express";
const app: Application = express();

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status,
    },
  });
});

export default app;

//https://thecowblog.com/auth-js-exploration-1b6c27cf076f
