const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    material: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
},
    { timestamps: true })



const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;