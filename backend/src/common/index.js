const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Necesitas autorización" });
  }

  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.rol !== "user")
    return res.status(400).json({ message: "Acceso denegado al cliente" });
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.rol !== "admin")
    return res.status(400).json({ message: "Acceso denegado al admin" });
  next();
};
