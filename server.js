const express = require("express");
const cookieParser = require("cookie-parser");
const templates = require("./public/scripts/template.js");
const serverScripts = require("./public/scripts/serverscripts.js");
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
    if (serverScripts.login(req.body)){
        const email = req.body.email;
        res.cookie("email", email);
        res.redirect("/");
    }else{
        console.log("error..");
    }
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
    serverScripts.register(req.body);
});


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});