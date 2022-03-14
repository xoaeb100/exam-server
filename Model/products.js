const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Product = new Schema({
    brandName:{
        type: String,
        required: [true, "Please Enter Product Brand Name"],
    },
    productName: {
        type: String,
        required: [true, "Please Enter Product Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    price: {
        type: String,
        required: [true, "Please Enter Product Price"],
    },
    img: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    // forTime: {
    //     type: Date,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Product", Product);