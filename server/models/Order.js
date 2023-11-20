const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullPrice: {
        type: Number,
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        size : {
            type : String,
            required : true
        },
        color : {
            type : String,
            required : true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
},
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
