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
app.use(cors({
  origin: 'http://localhost:4000', 
  credentials: true, 
}));
app.use(logger("dev"));
app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Routes
app.use("/", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Catch 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Not Found" });
});

app.get('/api/auth/signin/callback', (req, res) => {
  // After successful authentication
  res.redirect('http://localhost:4000/uploadcloud') // or whatever frontend route you want
})

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
