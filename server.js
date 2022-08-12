const express = require("express");
const cookieParser = require("cookie-parser");
const templates = require("./public/scripts/template.js");
const db = require("./database/connection.js");
const { Server } = require("http");
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

server.post("/products", (req, res)=>{
    if (!req.cookies.email){
        console.log("You need to be logged in to perform this action");
    }else{
        db.query(`SELECT id FROM shop_users WHERE email='${req.cookies.email}'`).then((result)=>{
            const userId = result.rows[0].id;
            db.query(`INSERT INTO cart (product_Id,userId) values('${req.body.productId}','${userId}')`).then((result2)=>{
                console.log("added (I think)");
                console.log(result2.rows);
            });
        });
    }
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

server.get("/cart", (req, res)=>{
    const email = req.cookies.email;
    db.query(`SELECT id FROM shop_users WHERE email='${email}'`).then((result) =>{
        const userId = result.rows[0].id;
        db.query(`SELECT * FROM cart WHERE userId='${userId}'`).then((result2)=>{
            res.send(templates.drawCart(email, result2.rows));
        });
    });
});


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});