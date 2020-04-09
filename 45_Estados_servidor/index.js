const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());