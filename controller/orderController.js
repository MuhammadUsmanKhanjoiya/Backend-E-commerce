import ordermodel from "../models/order.js";
import UserModel from "../models/user.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address,email } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new ordermodel(orderData);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {};

const placeOrderRazorpay = async (req, res) => {};

const allOrders = async (req, res) => {
  try {
    const orders = await ordermodel.find()
    res.json({ success: true,orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); 
  }
};

const userOrders = async (req, res) => {
  try {
      const { userId} = req.body
      const orders = await ordermodel.find({userId})
      res.json({success:true, orders})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
      const { orderId , status} = req.body
      await ordermodel.findByIdAndUpdate(orderId,{status})
      res.json({success:true, message:"status updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderPayfast = async (req, res) => {
  try {
    const { userId, items, amount, address, email } = req.body;

    // Create order with "Pending" status
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "PayFast",
      payment: false,
      status: "Pending",
      date: Date.now(),
    };

    const newOrder = await ordermodel.create(orderData);

    // Create PayFast payment link
    const paymentData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      return_url: process.env.PAYFAST_RETURN_URL,
      cancel_url: process.env.PAYFAST_CANCEL_URL,
      notify_url: process.env.PAYFAST_NOTIFY_URL,
      amount: amount.toFixed(2),
      item_name: `Order ${newOrder._id}`,
      m_payment_id: newOrder._id.toString(),
      email_address: email,
    };

    const params = new URLSearchParams(paymentData);
    const paymentUrl = `${process.env.PAYFAST_BASE_URL}?${params.toString()}`;

    res.json({ success: true, paymentUrl });
  }catch (error) {
  console.error("🔥 PayFast Error:", error);
  res.status(500).json({ success: false, message: error.message });
}
};



export default {
  userOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrderPayfast,
  allOrders,
  updateStatus,
};
