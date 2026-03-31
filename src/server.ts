import app from "./app";
import { env } from "./config";

const PORT = env.PORT || 5000;

let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
  try {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = (signal: string): void => {
  console.log(`\n🛑 Received ${signal}. Shutting down server...`);

  if (server) {
    server.close(() => {
      console.log("✅ Server closed successfully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

startServer();

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
