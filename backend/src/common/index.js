const jwt = require("jsonwebtoken");
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')


const storage = multer.diskStorage({ //usamos multer para almacenamiento
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),  'uploads')) //carpeta de productos
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

exports.upload = multer({storage})

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
  if (req.user.role !== "user")
    return res.status(400).json({ message: "Acceso denegado al cliente" });
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(400).json({ message: "Acceso denegado al admin" });
  next();
};
