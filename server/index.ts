import "dotenv/config";
import { isVercel } from "./utils/env";
import express from "express";
import cors from "cors";
import { connectDB } from "./database/connect";
import tasksRouter from "./routes/tasks.routes";
import usersRouter from "./routes/users.routes";
import cookieParser from "cookie-parser";

const app = express();

const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        origin === clientUrl ||
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/users", usersRouter);

app.use("/api/v1/tasks", tasksRouter);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      status: err.status || "error",
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
      errors: err.errors,
    });
  },
);

let dbConnectionPromise: Promise<void> | null = null;

export const initDB = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB(process.env.MONGODB_URI as string);
  }

  try {
    await dbConnectionPromise;
  } catch (error) {
    dbConnectionPromise = null;
    throw error;
  }
};

if (!isVercel) {
  const startServer = async () => {
    try {
      await initDB();

      const port = process.env.PORT || 3002;
      app.listen(port, () => {
        console.log(`server is listening on port ${port}...`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
