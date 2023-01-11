require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const PORT = 5500;
require("./SRC/api/db/conction");
const user = require("./SRC/api/module/user");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cookieparser = require('cookie-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());


const logvalidation = (req, res, next) => {
    const shecme = joi.object().keys({
        email: joi.string().email({ tlds: { allow: ['com', 'in'] } }),
        password: joi.number().required(),
    })//.unknown(true)

    const { error } = shecme.validate(req.body, { abortEarly: false });

    if (error) {

        res.render("login", { massge: "please enter valid login details" })
        // alert(element.message)


    }
    else { next(); };
}
let SEmail;
let SPassword;

function sendmailabc() {
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jjai24386@gmail.com", // generated ethereal user
            pass: "kduk ikok ieom enmi", // generated ethereal password
        }
    });

    var mailoption = {
        from: 'jjai24386@gmail.com', // sender address
        to: SEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `your aaccout succes full create on  lit pvt your
         id is ${SEmail} and your password is ${SPassword} Hello world?` // plain text body
    }
    transporter.sendMail(mailoption, function (error, info) {
        if (error) { console.log(error) }

        else { console.log("mail is succes full sand", info.response) }
    })

}


const registervalidation = (req, res, next) => {
    const shecme = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().email({ tlds: { allow: ['com', 'in'] } }),
        password: joi.number().required(),
        phone: joi.number().min(1000000000),
        address: joi.string()

    })//.unknown(true)

    const { error } = shecme.validate(req.body, { abortEarly: false });

    if (error) { res.send({ error: error.details }) }
    else { next(); };
}

app.get("/", async (req, res) => {
    try {
        const token = req.cookies.user;
        // console.log("fgfhgf", token);
        if (token) {
            res.render("index");
        } else {
            res.render("login");
        }

    } catch (error) {
        res.send(error);
    }
})

app.post("/LogIn", logvalidation, async (req, res) => {
    try {
        const token = req.cookies.user;
        // console.log("fgfhgf", token);
        if (token) {
            res.render("index")
        } else {
            console.log(req.body.password)
            const finduser = await user.find({ email: req.body.email })
            console.log(finduser);
            //  console.log("process.env.SECRT_KEY",process.env.SECRT_KEY)
            if (finduser) {
                finduser.forEach(async element => {
                    SEmail = element.email
                    SPassword = element.password
                    const match = await bcrypt.compare(req.body.password, SPassword);

                    if (match) {
                        const token = await jwt.sign({ _id: finduser._id }, process.env.SECRT_KEY);
                        console.log("token123", token)
                        res.render("index", { finduser })
                        res.cookie("user", token, {
                            expires: new Date(Date.now() + 60000 * 60 * 6),
                            httpOnly: true

                        })
                    } else {
                        res.send("log detail is invalide")
                    }
                });
                sendmailabc()
            } else {
                res.send("invalid log invalide")
            }
        }

    } catch (error) {
        res.send(error)
    }
})

app.get("/LogOut", async (req, res) => {
    try {
        res.clearCookie("user", 'token', { expires: new Date(0) })
            .redirect("/");
    } catch (error) {
        res.status(501).send(error);
    }
})



app.get("/register", (req, res) => {
    res.render("resister");
})


app.post("/resister", registervalidation, async (req, res) => {

    try {
        const token = req.cookies.user;
        // console.log("fgfhgf", token);
        if (token) {
            res.render("index");
        } else {
            // const token = await jwt.sign({ _id: finduser._id }, process.env.SECRT_KEY);
            const finduser = await user.find({ email: req.body.email });
            console.log("finduser", finduser);
            if (finduser.length > 0) {
                res.render("login", { massge: "user all ready registetion is complite" })
            } else {
                const password = await bcrypt.hash(req.body.password, 10);
                const userdetail = new user({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    password: password

                });
                const savedata = await userdetail.save();
                sendmailabc();
                if (userdetail) {
                    res.render("login", { massge: "registetion is complite" });
                }
            }
        }

    } catch (error) {
        res.send(error);
    }
})



app.listen(PORT, () => {
    console.log(`sarver listen at PORT number ${PORT}`);
})