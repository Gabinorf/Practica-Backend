const express = require("express");
const bodyParser = require("body-parser");
const server = express();

const fs = require("fs");

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

const contactos =[];

server.use([agregarLog,bodyParser.json()]);

server.get("/demo", (req,res)=>{
    res.send("hola mundo");
});

server.post("/contacto", (req,res)=>{
    console.log(req.body);
    res.send("ok");
});


function agregarLog(req,res,next){
   const {nombre,email} = req.body;
   console.log(req.);
   next();

   
    if (!nombre || ! !email){
        res.send("Falta información");
    }
    else {
        const texto = null;
        (req.method === "GET") ? texto = req.method+" - "+req.pathname+" - {version: 1} - null" : texto = req.method=" - "+req.pathname+" - null - "+req.body;

        fs.appendFile('log.txt', texto , (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
    }
      
}