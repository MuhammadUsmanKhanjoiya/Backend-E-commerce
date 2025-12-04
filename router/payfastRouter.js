import express from "express";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import orderModel from "../models/order.js";




const router = express.Router();

const PAYFAST_MERCHANT_ID = "10043274";
const PAYFAST_MERCHANT_KEY = "1ot5mpf7496zi";
const PAYFAST_URL = "https://sandbox.payfast.co.za/eng/process"; // for testing
const RETURN_URL = "https://unethnological-nonapportionable-mia.ngrok-free.dev/payment-success";
const CANCEL_URL = "https://unethnological-nonapportionable-mia.ngrok-free.dev/payment-failed";
const NOTIFY_URL = "https://unethnological-nonapportionable-mia.ngrok-free.dev/api/payfast/notify"; // backend route

router.post("/initiate", async (req, res) => {
  try {
    const { amount, item_name, email } = req.body;
      
    const data = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: RETURN_URL,
      cancel_url: CANCEL_URL,
      notify_url: NOTIFY_URL,
      amount,
      item_name,
      email_address: email,
    };

    // Convert object to query string
    const formBody = Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    res.json({
      redirectUrl: `${PAYFAST_URL}?${formBody}`,
    });
  } catch (error) {
    console.error("PayFast Init Error:", error);
    res.status(500).json({ message: "Failed to start PayFast payment" });
  }
});

router.post("/notify", async (req, res) => {
  try {
    const data = req.body;
    const paymentId = data["m_payment_id"];
    const paymentStatus = data["payment_status"];

    if (paymentStatus === "COMPLETE") {
      await orderModel.findByIdAndUpdate(paymentId, {
        payment: true,
        status: "Paid",
      });
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("PayFast notify error:", error);
    res.status(500).send("Error");
  }
});




export default router;


// ✅ ITN endpoint — PayFast calls this automatically

