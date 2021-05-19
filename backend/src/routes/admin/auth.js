const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { signup, signin, requireSignin } = require("../../controller/admin/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");

router.post("/admin/signin",validateSigninRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);

module.exports = router;
