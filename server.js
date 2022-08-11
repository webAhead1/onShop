const express = require("express");
const cookieParser = require("cookie-parser");
const templates = require("./public/scripts/template.js");
const db = require("./database/connection.js");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));
server.use(express.static("./public/scripts"))
server.use(express.urlencoded());
server.use(cookieParser());

server.get("/", (req, res) => {
    res.send(templates.drawIndexPage(req.cookies.email));
});

server.get("/login", (req, res) => {
    res.send(templates.drawLoginPage());
});

server.post("/login", (req, res) => {
    const data = req.body;
    db.query(`SELECT * FROM shop_users where email='${data.email}' AND password='${data.password}'`).then((result)=>{
        if (result.rows.length > 0){
            res.cookie("email", data.email);
            res.redirect("/");
        }else{
            console.log("Account was not found...");
        }
    });
});

server.get("/logout", (req, res)=>{
    res.clearCookie("email");
    res.redirect("/");
});

server.get("/products", (req, res) => {

    res.send(templates.drawProductsPage(req.cookies.email));

});

server.get("/register", (req, res) => {
    res.send(templates.drawRegisterPage());
});

server.post("/register", (req, res)=>{
    const data = req.body;
    if (data.pass !== data.confirmpass){
        console.log("passwords do not match!");
        return;
    }
    db.query(`SELECT * FROM shop_users WHERE email='${data.email}'`).then((result)=>{
        if (result.rows.length > 0){
            console.log("email already exists");
        }else {
            db.query(`INSERT INTO shop_users (email, password) values('${data.email}','${data.pass}')`).then((result) => {
            res.cookie("email", data.email);
            console.log("Account has been created, redirecting to home page.");
            res.redirect("/");
            });
        }  
    });

});


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});