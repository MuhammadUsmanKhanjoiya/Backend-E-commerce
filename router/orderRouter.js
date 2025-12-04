import express from "express";
import orderController from "../controller/orderController.js";

const {
  userOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  updateStatus,
  placeOrderPayfast,
} = orderController;

import adminAuth from "../middleware/AdminAuth.js";
import authUser from "../middleware/auth.js";

const OrderRouter = express.Router();

OrderRouter.post("/list", adminAuth, allOrders);
OrderRouter.post("/status", adminAuth, updateStatus);
OrderRouter.post("/place", authUser, placeOrder);
OrderRouter.post("/razorpay", authUser, placeOrderRazorpay);
OrderRouter.post("/stripe", authUser, placeOrderStripe);
OrderRouter.post("/userorders", authUser, userOrders);
OrderRouter.post("/place/payfast",authUser, placeOrderPayfast);

export default OrderRouter;
