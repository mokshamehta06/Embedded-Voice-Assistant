const razorpay = require('../Config/razorpay');
const Billing = require('../Models/billing.model');
const User = require('../Models/user.model');
const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.userId;
        let amount = 0;

        if (plan === "pro") {
            amount = 299;
        }

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        });

        await Billing.create({
            user: userId,
            amount,
            plan,
            orderId: order.id,
        });

        return res.json({
            success: true,
            order,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "order creation failed"
        });
    }
};

const verifyBilling = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.userId;
        
        const sign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (sign !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        const billing = await Billing.findOne({
            orderId: razorpay_order_id,
            user: userId,
        });

        if (!billing) {
            return res.status(400).json({
                success: false,
                message: "Billing record not found"
            });
        }

        billing.status = "paid";
        billing.paymentId = razorpay_payment_id;
        await billing.save();

        await User.findByIdAndUpdate(userId, {
            plan: "pro",
            proExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        });

        return res.json({
            success: true,
            message: "Payment verified successfully"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};

module.exports = {
    createOrder,
    verifyBilling
};