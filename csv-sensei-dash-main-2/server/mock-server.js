#!/usr/bin/env node

// Simple mock server for development
// This provides the feature toggles API without requiring MongoDB

const express = require("express");
const cors = require("cors");

const app = express();
const port = 4001;

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8080",
      "https://veerify-ai-frontend.vercel.app",
      "https://veerify-ai-ashy.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(express.json());

// Mock feature toggles data
const defaultToggles = [
  {
    _id: "default-op-billing",
    featureName: "op_billing",
    isEnabled: true,
    displayName: "OP Billing",
    description: "Outpatient billing management system",
    lastModifiedBy: "system",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "default-doctor-roster",
    featureName: "doctor_roster",
    isEnabled: true,
    displayName: "Doctor Roster",
    description: "Doctor roster and scheduling management",
    lastModifiedBy: "system",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "default-compliance-ai",
    featureName: "compliance_ai",
    isEnabled: true,
    displayName: "Compliance AI",
    description: "AI-powered compliance monitoring and reporting",
    lastModifiedBy: "system",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "CSV Sensei Dashboard Mock API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      featureToggles: "/api/feature-toggles",
    },
  });
});

// Feature toggles endpoint
app.get("/api/feature-toggles", (req, res) => {
  console.log("📡 Feature toggles requested");
  res.json({
    success: true,
    data: { toggles: defaultToggles },
  });
});

// Individual feature toggle endpoint
app.get("/api/feature-toggles/:featureName", (req, res) => {
  const { featureName } = req.params;
  console.log(`📡 Feature toggle requested for: ${featureName}`);

  const toggle = defaultToggles.find((t) => t.featureName === featureName);

  if (!toggle) {
    return res.status(404).json({
      success: false,
      message: "Feature toggle not found",
    });
  }

  res.json({
    success: true,
    data: { toggle },
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Mock API server running on port ${port}`);
  console.log(`📊 CSV Sensei Dashboard Mock API ready`);
  console.log(`🌐 Environment: development`);
  console.log(
    `🔗 Feature toggles: http://localhost:${port}/api/feature-toggles`
  );
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

