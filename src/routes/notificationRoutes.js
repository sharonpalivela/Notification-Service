const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getUserNotifications,
} = require("../controllers/notificationController");

router.post("/notifications", sendNotification);

router.get("/users/:id/notifications", getUserNotifications);

module.exports = router;
