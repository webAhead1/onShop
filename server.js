const express = require("express");
const cookieParser = require("cookie-parser");
const templates = require("./public/scripts/template.js");
const serverScripts = require("./public/scripts/serverscripts.js");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));
server.use(express.static("./public/scripts"))
server.use(express.urlencoded());

server.get("/", (req, res) => {
    res.send(templates.drawIndexPage());
});

server.get("/login", (req, res) => {
    res.send(templates.drawLoginPage());
});

server.post("/login", (req, res) => {
    if (serverScripts.login(req.body)){
        const email = req.body.email;
        res.cookie("email", email);
        res.redirect("/");
    }
});

server.get("/products", (req, res) => {

    res.send(templates.drawProductsPage());

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