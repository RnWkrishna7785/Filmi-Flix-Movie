import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db.js";
import app from "./app.js";
import createAdmin from "./utils/createAdmin.js";

dotenv.config();

connectDB().then(async () => {
  await createAdmin();
});

const BASE_PORT = Number(process.env.PORT) || 5000;
let server;

const startServer = (startPort = BASE_PORT, maxAttempts = 10) => {
  let port = startPort;
  const httpServer = http.createServer(app);

  const tryListen = () => {
    httpServer.listen(port, () => {
      server = httpServer;
      console.log(`🚀 FILMIFLIX Server running on port ${port}`);
      console.log(`⚡ API URL: http://localhost:${port}`);
    });
  };

  httpServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(
        `⚠️ Port ${port} already in use. Trying port ${port + 1}...`,
      );
      port += 1;
      if (port > startPort + maxAttempts) {
        console.error("❌ No available ports found. Exiting.");
        process.exit(1);
      }
      setTimeout(() => tryListen(), 150);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });

  tryListen();
};

startServer();

process.on("unhandledRejection", (err) => {
  console.error(`💥 Unhandled Promise Rejection: ${err?.message || err}`);
  if (server && server.close) server.close(() => process.exit(1));
  else process.exit(1);
});
