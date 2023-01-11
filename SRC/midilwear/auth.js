require('dotenv').config();
const jwt = require("jsonwebtoken");
const user = require("../api/module/user");


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.user;
        console.log(token);
        const varifyuser = await jwt.verify(token, process.env.SECRT_KEY)
        const user = await user.findOne({ _id: varifyuser._id })
        console.log(user);
        req.token = [];
        req.user = user;
        next()
    } catch (error) {
        res.send(error)
    }
}

module.exports = auth