const express = require('express');
const server = express();
const bodyParser = require("body-parser");


server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());


const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/acamica');


async function getBandas(){
    return await sequelize.query('SELECT * FROM bandas',
        {type: sequelize.QueryTypes.SELECT})
        .then(res=>{
            return res
        })
};

server.get("/bandas", async (req,res)=>{
    
    let datos = await getBandas().then(resultado=>{
        return resultado
    });
    
    res.json(datos);
});


server.post("/canciones", async (req,res)=>{
    await sequelize.query("INSERT INTO canciones VALUES (?, ?, ?, ?, ?, ?)",
        {replacements: [req.body.id, req.body.nombre, req.body.duracion, req.body.album, req.body.banda, req.body.fecha_publicacion]})
        .then(response=>{
            res.send("se agrego una cancion")
    })
})


//(id, nombre, duracion, album, banda, fecha_publicacion)