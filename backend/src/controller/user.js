const User = require('../models/user')

exports.signup = (req, res) =>{
    User.findOne({correo: req.body.correo}).exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'Ya te has registrado. Prueba iniciando sesión!'
        })

        const { nombre, apellido, correo, contra } = req.body
        const _user = new User({ nombre, apellido, correo, contra, username: Math.random().toString() })

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: "Algo salió mal"
                })
            }
            if(data){
                return res.status(201).json({
                    message: 'Registrado exitosamente'
                })
            }
        })
    })


}