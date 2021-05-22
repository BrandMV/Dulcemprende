const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    slug:{ //slug define la palabra de la parte final de la URL
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String
    },
    categoryImage: { type: String},
    idpadre: {
        type: String
    }

}, {timestamps:true})

module.exports = mongoose.model('Category', categorySchema)