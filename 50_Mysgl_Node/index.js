const express = require('express');
const server = express();
const bodyParser = require("body-parser");


server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());


const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/acamica');


/*
getBandas().then(resultado=>{
    console.log(resultado)
});
*/

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