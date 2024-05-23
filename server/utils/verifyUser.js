import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
  if (!req.cookies || !req.cookies.access_token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default verifyUser;
