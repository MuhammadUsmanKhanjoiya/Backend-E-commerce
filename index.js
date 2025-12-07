import express from "express";
import cors from "cors";
import "dotenv/config";
import DBConnect from "./config/DB.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import cartRouter from "./router/cartRouter.js";
import OrderRouter from "./router/orderRouter.js";
import payfastRouter from "./router/payfastRouter.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","token"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

DBConnect();
connectCloudinary();

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", OrderRouter);
app.use("/api/payfast", payfastRouter);
app.get("/payment-success", (req, res) => {
  res.send("🎉 Payment completed successfully!");
});

app.get("/payment-failed", (req, res) => {
  res.send("❌ Payment failed or cancelled");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
