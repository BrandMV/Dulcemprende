const {check, validationResult} = require('express-validator');

exports.validateSignupRequest = [
    check('nombre').notEmpty().withMessage('El nombre es requerido'),
    check("apellido").notEmpty().withMessage('Los apellidos son requeridos'),
    check('correo').isEmail().withMessage('Ingresa un correo valido'),
    check('contra').isLength({min: 7}).withMessage('La contraseña debe de tener al menos 7 caracteres')
]

exports.validateSigninRequest = [
    check('correo').isEmail().withMessage('Ingresa un correo valido'),
    check('contra').isLength({min: 7}).withMessage('La contraseña es incorrecta')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
}