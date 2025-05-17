const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
    type: {
      type: String,
      enum: ["email", "sms", "in-app"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    email: {
      type: String,
      required: function () {
        return this.type === "email";
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.type === "sms";
      },
    },
    sentAt: {
      type: Date,
    },
    retryCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notification", notificationSchema);
