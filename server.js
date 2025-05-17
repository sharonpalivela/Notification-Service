require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
const notificationRoutes = require("./src/routes/notificationRoutes");
app.use("/api", notificationRoutes);

// Start server after DB connection
const PORT = process.env.PORT || 5050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
  });
