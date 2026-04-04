import http from "http";
import app from "./app";
import { env } from "./config";
import { Server } from "socket.io";

const PORT = env.PORT || 5000;

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // ✅ user personal room (IMPORTANT FIX)
  socket.on("join", (userId: string) => {
    if (!userId) return;

    socket.join(`user:${userId}`); // 🔥 FIXED
    console.log(`👤 User joined room: user:${userId}`);
  });

  // ✅ project room
  socket.on("join_project", (projectId: string) => {
    if (!projectId) return;

    socket.join(`project:${projectId}`);
    console.log(`📁 Joined project room: project:${projectId}`);
  });

  // ✅ visitor room (NEW - PUBLIC CHAT FIX)
  socket.on("join_visitor", (visitorId: string) => {
    if (!visitorId) return;

    socket.join(`visitor:${visitorId}`);
    console.log(`🌐 Visitor joined room: visitor:${visitorId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

let server: ReturnType<typeof httpServer.listen>;

const startServer = async (): Promise<void> => {
  try {
    server = httpServer.listen(PORT, () => {
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
