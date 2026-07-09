const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    plan: String,
    paymentId: String,
    orderId: String,
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;