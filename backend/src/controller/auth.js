const User = require("../models/user");
const jwt = require("jsonwebtoken"); //creamos un token para manejar la sesión
const bcrypt = require('bcrypt');
const shortid = require("shortid");


exports.signup = (req, res) => {

  User.findOne({ correo: req.body.correo }).exec( async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Ya te has registrado. Prueba iniciando sesión!",
      });

    const { nombre, apellido, correo, contra } = req.body;
    const hash_contra = await bcrypt.hash(contra, 10)

    const _user = new User({
      nombre,
      apellido,
      correo,
      hash_contra,
      username: shortid.generate(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Algo salió mal",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Registrado exitosamente",
        });
      }
    });
  });
};

exports.signin = (req, res, next) => {
  User.findOne({ correo: req.body.correo }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.contra)) {
        const token = jwt.sign({ _id: user._id, rol: user.rol}, process.env.JWT_SECRET, {
          expiresIn: "2h",
        }); //dos horas de expiracion
        const { _id, nombre, apellido, correo, rol, nombreCompleto } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            nombre,
            apellido,
            correo,
            rol,
            nombreCompleto,
          },
        });
      } else {
        return res.status(400).json({
          message: "Contraseña incorrecta",
        });
      }
    } else {
      return res.status(400).json({ message: "Algo salió mal" });
    }
  });
};

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next()
}
