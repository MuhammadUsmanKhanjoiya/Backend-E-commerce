import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.status(400).json({ message: "invailed password" });
    }
    const token = createToken(existingUser._id);
    res
      .status(200)
      .json({ message: "login successfully ", existingUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};

const Registor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    

    const sald = await bcrypt.genSalt(5);
    const hashpassword = await bcrypt.hash(password, sald);
    const user = new UserModel({ name, email, password: hashpassword });
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ message: "registor successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "some thing went wrong", error: error.message });
  }
};
const adminlogin = async (req, res) => {
   try {
    const {email , password}= req.body
    
     
     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.jwt_secret)
        res.json({ success: true, token });
    }    else{
      res.json({ success: false, message:"Invaild Credentials" });
    }

   } catch (error) {
    
   }
  
};
export { Registor, login, adminlogin };
