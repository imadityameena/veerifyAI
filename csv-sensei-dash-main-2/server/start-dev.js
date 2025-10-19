#!/usr/bin/env node

// Simple development server startup script
// This script starts the server with minimal configuration for development

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting CSV Sensei Dashboard Server in Development Mode...");

// Set environment variables for development
const env = {
  ...process.env,
  NODE_ENV: "development",
  PORT: "4001",
  MONGODB_URI: "mongodb://localhost:27017/csv-sensei-dash",
  JWT_SECRET: "dev_secret_key_for_development_only",
  FRONTEND_URL: "http://localhost:8080",
};

// Start the server
const server = spawn("node", ["dist/index.js"], {
  cwd: path.join(__dirname),
  env,
  stdio: "inherit",
});

server.on("error", (error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

server.on("exit", (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  server.kill("SIGINT");
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down server...");
  server.kill("SIGTERM");
});

