const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signup, signin, requireSignin } = require("../controller/auth");

router.post("/inicioSesion", signin);

router.post("/registro", signup);

// router.post('/perfil', requireSignin, (req, res) => {
//     res.status(200).json({user: 'perfil'})
// })

module.exports = router;
