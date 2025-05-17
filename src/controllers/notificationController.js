const Notification = require("../models/Notification");

exports.sendNotification = async (req, res) => {
try {
const { userId, type, message, email, phoneNumber } = req.body;
if (!userId || !type || !message) {
return res.status(400).json({ error: "userId, type and message are required" });
}
const notification = new Notification({
  userId,
  type,
  message,
  email: type === "email" ? email : undefined,
   phoneNumber: type === "sms" ? phoneNumber : undefined,
});
await notification.save();
return res.status(201).json({ message: "Notification created", notification });
} catch (error) {
console.error("Send notification error:", error);
res.status(500).json({ error: "Server error" });
}
};
exports.getUserNotifications = async (req, res) => {
try {
const userId = req.params.id;
const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
res.status(200).json({ notifications });
} catch (error) {
console.error("Get user notifications error:", error);
res.status(500).json({ error: "Server error" });
}
};
