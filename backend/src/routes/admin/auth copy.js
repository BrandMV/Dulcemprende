const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { signup, signin, signout } = require("../../controller/admin/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");
const { requireSignin } = require("../../common");

router.post("/admin/signin",validateSigninRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout',  signout )

module.exports = router;
