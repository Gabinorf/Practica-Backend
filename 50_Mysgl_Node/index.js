const express = require('express');
const server = express();
const bodyParser = require("body-parser");


server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());

//SEQUELIZ, MUSQL2 NECESARIOS PARA LA CONEXIÓN DESDE NODE
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/acamica');


async function getBandas(){
    return await sequelize.query('SELECT * FROM bandas',
        {type: sequelize.QueryTypes.SELECT})
        .then(res=>{
            return res
        })
};

//Obtener bandas
server.get("/bandas", async (req,res)=>{
    
    let datos = await getBandas().then(resultado=>{
        return resultado
    });
    
    res.json(datos);
});

//Agregar una canción
server.post("/canciones", (req,res)=>{
    sequelize.query("INSERT INTO canciones VALUES (?, ?, ?, ?, ?, ?)",
        {replacements: [req.body.id, req.body.nombre, req.body.duracion, req.body.album, req.body.banda, req.body.fecha_publicacion]})
        .then(response=>{
            res.status(201).send("se agrego una cancion")
    })
})

//Modificar canción por id
server.put("/canciones/:id",(req,res)=>{
    const id = req.params.id;
    sequelize.query(`UPDATE canciones SET nombre = ?, duracion = ?, album = ?, banda = ?, fecha_publicacion = ? WHERE id=${id}`,
        {replacements: [req.body.nombre, req.body.duracion, req.body.album, req.body.banda, req.body.fecha_publicacion]})
    .then((response=>{
        res.status(200).send("se modifico una cancion")
    }))    
})

//Eliminar canción por id
server.delete("/canciones/:id",(req,res)=>{
    const id = req.params.id;
    sequelize.query(`DELETE FROM canciones WHERE id=?`,
        {replacements: [id]})
    .then((response=>{
        res.status(204).send("se eliminó una cancion")
    })) 
})

//Retornar todas las canciones
server.get("/canciones", (req,res)=>{
    //si tiene query string, filtra por nombre 
    if (Object.keys(req.query).length!=0){
        const nombre = req.query.nombre;
        sequelize.query(`SELECT * FROM canciones WHERE nombre LIKE '${nombre}%'`,
            {type: sequelize.QueryTypes.SELECT})
        .then(response=>{
            res.status(200).json(response);
        })
    }

    else {
        sequelize.query(`SELECT * FROM canciones`,
            {type: sequelize.QueryTypes.SELECT})
        .then(resultados=>{
        res.status(200).json(resultados)
    })
    }  
})