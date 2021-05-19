const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signup, signin, requireSignin } = require("../controller/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");

router.post("/signin", validateSigninRequest, isRequestValidated,signin);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

// router.post('/perfil', requireSignin, (req, res) => {
//     res.status(200).json({user: 'perfil'})
// })

module.exports = router;
