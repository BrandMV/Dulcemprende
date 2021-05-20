const mongoose = require('mongoose')
const bcrypt = require('bcrypt') //hashear contraseña
//esquema del usuario con lo necesario
const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true, //"hello  "/ " hello" => "hello"
        min: 3,
        max: 20
    },
    apellido:{
        type: String,
        required: true,
        trim: true, //"hello  "/ " hello" => "hello"
        min: 3,
        max: 20
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_contra:{
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    numero:{type: String},
    foto:{type: String}
}, {timestamps: true})

userSchema.virtual('contra').set(function(contra){
    this.hash_contra = bcrypt.hashSync(contra, 10) //hasheamos la contraseña
})

userSchema.virtual("nombreCompleto").get(function(){
    return `${this.nombre} ${this.apellido}`
})

userSchema.methods = {
    authenticate: function(contra){
        return bcrypt.compareSync(contra, this.hash_contra) //corroboramos la contraseña del usuario con bcrypt
    }
}

module.exports = mongoose.model('User', userSchema)