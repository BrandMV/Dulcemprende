const {check, validationResult} = require('express-validator');

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('El nombre es requerido'),
    check("lastName").notEmpty().withMessage('Los apellidos son requeridos'),
    check('email').isEmail().withMessage('Ingresa un correo valido'),
    check('password').isLength({min: 7}).withMessage('La contraseña debe de tener al menos 7 caracteres')
]

exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Ingresa un correo valido'),
    check('password').isLength({min: 7}).withMessage('La contraseña es incorrecta')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
}