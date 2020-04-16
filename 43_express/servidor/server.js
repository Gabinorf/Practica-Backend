const express = require("express");
const server = express();

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

const  objeto = [
    {
        id: 1,
        nombre : "Gabino",
        apellido : "Rodríguez",
    }
];  

//Retorno un JSON
server.get("/personas", (req,res) => {
    res.json(objeto);
});

//Especifico Status Code de retorno
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

//Path con Parámetros
server.get("/personas/:id", (req,res) => {
    const id = req.params.id;
    res.json(personas[id]);
});

//Path con Query strings
server.get("/persona", (req,res) => {
    res.json(req.query);
});




/**********************************************************************
    ACTIVIDAD
************************************************************************/

//Creo listas de alumnos para comisiones (dwfs, dwa, bigdata)
const faker = require("faker");

class Alumnos {
    constructor(id, nombre, apellido, email){
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.email = email
    }
}

let alumnosDwfs = [];
let alumnosBigdata = [];
let alumnosDwa = [];

for (let i=0; i<10; i++){
    let alumno = new Alumnos(i, faker.name.firstName(), faker.name.lastName(), faker.internet.email());
    alumnosDwfs.push(alumno);
};

for (let i=0; i<15; i++){
    let alumno = new Alumnos(i, faker.name.firstName(), faker.name.lastName(), faker.internet.email());
    alumnosDwa.push(alumno);
};

for (let i=0; i<20; i++){
    let alumno = new Alumnos(i, faker.name.firstName(), faker.name.lastName(), faker.internet.email());
    alumnosBigdata.push(alumno);
};


//GET Alumnos por comisión con filtro por Query string
server.get("/acamica/:comision/alumnos",(req,res)=>{
    const comision = req.params.comision;
    let resultado = [];
    const filtrar = (nombre, listaAlumnos) => {
        for (let i=0; i<listaAlumnos.length; i++){
            if (req.query.nombre == listaAlumnos[i].nombre) {
                resultado.push(listaAlumnos[i]);
            }
        }
        if (resultado.length==0){
            res.send("No se encontraron resultados")
        }
        else {
            res.json(resultado);
        }  
    };

    switch (comision) {
        case "dwfs":
            if (req.query.nombre){
                filtrar(req.query.nombre, alumnosDwfs);
            }
            if (!req.query.nombre) {
                res.json(alumnosDwfs);
            }
        break
        case "dwa":
            if (req.query.nombre){
                filtrar(req.query.nombre, alumnosDwa);
            }
            if (!req.query.nombre) {
                res.json(alumnosDwa);
            }
        break
        case "bigdata":
            if (req.query.nombre){
                filtrar(req.query.nombre, alumnosBigdata);
            }
            if (!req.query.nombre) {
                res.json(alumnosBigdata);
            }
        break        
    } 
})


//GET Alumnos por comisión por id
server.get("/acamica/:comision/alumnos/:id",(req,res)=>{
    const comision = req.params.comision;
    const id = req.params.id;
    switch (comision) {
        case "dwfs":
            if (id>=alumnosDwfs.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
                res.json(alumnosDwfs[id])
            }
        break
        case "dwa":
            if (id>=alumnosDwa.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
            res.json(alumnosDwa[id])
            }
        break
        case "bigdata":
            if (id>=alumnosBigdata.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
            res.json(alumnosBigdata[id])
            }
        break        
    } 
})

//DELETE Alumnos por comisión por id
server.delete("/acamica/:comision/alumnos/:id",(req,res)=>{
    const comision = req.params.comision;
    const id = req.params.id;
    switch (comision) {
        case "dwfs":
            if (id>=alumnosDwfs.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
                res.send(alumnosDwfs[id].nombre+" fue eliminado");
                alumnosDwfs.splice(id,1);
            }
        break
        case "dwa":
            if (id>=alumnosDwa.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
                res.send(alumnosDwa[id].nombre+" fue eliminado");
                alumnosDwa.splice(id,1);
            }
        break
        case "bigdata":
            if (id>=alumnosBigdata.length){
                res.statusCode = 404;
                res.send("El alumno no existe");
            }else{
                res.send(alumnosBigdata[id].nombre+" fue eliminado");
                alumnosBigdata.splice(id,1);
            }
        break        
    } 
})
