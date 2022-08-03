const express = require("express");
const templates = require("./public/scripts/template.js");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));
server.use(express.static("./public/scripts"));



server.get("/", (req, res) => {
    res.send(templates.drawIndexPage());
});

server.get("/login", (req, res) => {
    res.send(templates.drawLoginPage());
});



server.get("/products", (req, res) => {

    res.send(templates.drawProductsPage());

})


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});