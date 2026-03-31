import express from "express";
import cors from "cors";
import { env } from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app = express();

app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.use("/api/v1", router);

// test route (health check)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running...",
  });
});

app.use(notFound);

app.use(globalErrorHandler);
export default app;
