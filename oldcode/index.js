const express = require("express");
const path = require("path")
const hbs = require("hbs");
const app = express();
const PORT = 5500;
require("./SRC/api/conction");
const user = require("./SRC/api/module/user");

const user_router = require("./SRC/api/rauter/index");
const joi = require("joi");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(user_router);

// const logvalidation = (req, res, next) => {
//     const shecme = joi.object().keys({
//         email: joi.string().email({ tlds: { allow: ['com', 'in'] } }),
//         password: joi.number().required(),
//     })//.unknown(true)

//     const { error } = shecme.validate(req.body, { abortEarly: false });

//     if (error) { res.send({ error: error.details }) }
//     else { next(); };
// }


// const registervalidation = (req, res, next) => {
//     const shecme = joi.object().keys({
//         name: joi.string().required(),
//         email: joi.string().email({ tlds: { allow: ['com', 'in'] } }),
//         password: joi.number().required(),
//         phone: joi.number().min(1000000000),
//         address: joi.string()

//     })//.unknown(true)

//     const { error } = shecme.validate(req.body, { abortEarly: false });

//     if (error) { res.send({ error: error.details }) }
//     else { next(); };
// }


// app.get("/", async (req, res) => {
//     res.render("login")
// })

// app.post("/LogIn", logvalidation, async (req, res) => {
//     //console.log(req.body.password)
//     const finduser = await user.find({ email: req.body.email })
//     // console.log(finduser.password);
//     if (finduser) {
//         finduser.forEach(element => {
//             if (element.password == req.body.password) {
//                 res.send("log is succes")
//             } else {
//                 res.send("log detail is invalide")
//             }
//         });
//     } else {
//         res.send("invalid log invalide")
//     }
// })



// app.get("/register", (req, res) => {
//     res.render("resister")
// })
// app.post("/resister", registervalidation, async (req, res) => {

//     const userdetail = new user({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address,
//         password: req.body.password,
//     })
//     const savedata = await userdetail.save()
//     if (userdetail) {
//         res.render("login", { massge: "registetion is complite" })
//     }
// })

app.listen(PORT, () => {
    console.log(`sarver listen at PORT number ${PORT}`);
})