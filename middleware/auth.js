import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "not Authorized Login Again" });
  }
  try {
    const decoded = jwt.verify(token,process.env.jwt_secret)
    req.body.userId = decoded.id
    req.user = { id: decoded.id };
    next()
  } catch (error) {
    console.log(error);
    res.json({success:false , message:error.message})
    
  }
};

export default authUser
