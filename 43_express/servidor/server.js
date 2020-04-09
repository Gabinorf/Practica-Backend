const express = require("express");
const server = express();

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.get("/personas", (req,res) => {
    const  objeto = [
        {
            id: 1,
            nombre : "Gabino",
            apellido : "Rodríguez",
        }
    ];    
    res.json(objeto);
});

server.get("/error", (req,res) => {
    res.statusCode = 500;
    res.json( {
        error: "Algo salió mal..."
    }
    );
});

const  personas = [
    {
        id: 0,
        nombre : "Gabino",
        apellido : "Rodríguez",
    },
    {
        id: 1,
        nombre: "Pedro",
        apellido: "Picapiedra"
    }
];    

server.get("/personas/:id", (req,res) => {
    const id = req.params.id;
    res.json(personas[id]);
});




