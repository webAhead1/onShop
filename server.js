const express = require("express");
const path = require("path");
const PORT = 4000;

const server = express();

server.use(express.static("./public"));

server.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
});