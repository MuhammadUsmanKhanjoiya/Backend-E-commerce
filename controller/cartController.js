import UserModel from "../models/user.js";

const addToCard = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Card" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateToCard = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Card  Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getUserCard = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCard, updateToCard, getUserCard };
