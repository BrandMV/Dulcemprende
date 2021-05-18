const express = require("express");
const router = express.Router();
const User = require('../models/user')
const { signup } = require('../controller/user')

router.post("/inicioSesion", (req, res) => {

});


router.post("/registro", signup)





module.exports = router;
