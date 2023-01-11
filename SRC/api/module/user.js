const mongoose = require("mongoose");

// const jwt = require("jsonwebtoken");


const user = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,

    },
    address: {
        type: String,
        min: 0,
        max: 12,

    },
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }]

})



const userS = new mongoose.model("user", user);
module.exports = userS;
