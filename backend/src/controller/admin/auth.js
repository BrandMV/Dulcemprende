const User = require("../../models/user");
const jwt = require("jsonwebtoken"); //creamos un token para manejar la sesión

exports.signup = (req, res) => {
  User.findOne({ correo: req.body.correo }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Administrador ya registrado",
      });

    const { nombre, apellido, correo, contra } = req.body;
    const _user = new User({
      nombre,
      apellido,
      correo,
      contra,
      username: Math.random().toString(),
      rol: 'admin'
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Algo salió mal",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Registrado exitosamente como administrador",
        });
      }
    });
  });
};

exports.signin = (req, res, next) => {
  User.findOne({ correo: req.body.correo }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.contra) && user.rol === 'admin') {
        const token = jwt.sign({ _id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        }); //dos horas de expiracion
        const { _id, nombre, apellido, correo, rol, nombreCompleto } = user;
        res.cookie('token', token, {expiresIn: '1d'})
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

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message: 'Cerro sesión axitosamente'
  })
}