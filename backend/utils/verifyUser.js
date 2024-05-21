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


// import jwt from "jsonwebtoken";

// const verifyUser = (req, res, next) => {
//   if (!req.cookies || !req.cookies.access_token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     console.error("Error verifying user:", error);
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };

// export default verifyUser;

// import jwt from "jsonwebtoken";

// const verifyUser = (req, res, next) => {
//   const token = req.header('Authorization').split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Unauthorized. Access token is missing.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.user) {
//       throw new Error();
//     }
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Unauthorized. Invalid access token.' });
//   }
// };
// export default verifyUser

