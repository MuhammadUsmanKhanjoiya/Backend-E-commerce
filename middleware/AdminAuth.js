import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized Acces" });
    }
    const token_decoded = jwt.verify(token, process.env.jwt_secret);
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Unauthorized Acces" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

  next();
};

export default adminAuth;