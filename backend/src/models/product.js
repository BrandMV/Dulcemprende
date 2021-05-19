const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{ //slug define la palabra de la parte final de la URL
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number, 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offers:{
        typer: Number
    },
    productPictures: [
        {
            img: {
                type: String
            }
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}, //foreign key
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},//foreign key
            review: String
        }
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    updatedAt: Date, 

}, {timestamps:true})

module.exports = mongoose.model('Product', productSchema)