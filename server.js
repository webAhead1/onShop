const express = require("express");
const templates = require("./public/scripts/template.js");
const path = require("path");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));

server.get("/", (req, res)=>{
    res.send(templates.drawIndexPage());
});

server.get("/login", (req, res) => {
    res.send(templates.drawLoginPage());
});

server.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});