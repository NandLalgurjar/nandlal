const mongoose = require("mongoose");


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
        type: Number
    }

})


user.methods.genraAuthtoken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRT_KEY);
        // console.log(token ,"ttttttttttt");
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    } catch (error) {
        // console.log(error) 
        res.send("this eror part" + error)
        // console.log("thid eror part"+error)

    }
}

const userS = new mongoose.model("user", user);
module.exports = userS;
