const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { signup, signin, requireSignin } = require("../../controller/admin/auth");

router.post("/admin/inicioSesion", signin);

router.post("/admin/registro", signup);

module.exports = router;
