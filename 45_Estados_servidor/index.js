const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());

let autores = [];


//GET Autores
server.get('/autores', (req,res) =>{
    res.json(autores);
});

// POST agregar Autor
server.post("/autores",(req,res) =>{
    for (let i=0; i<autores.length; i++){
        if (req.body.nombre==autores[i].nombre & req.body.apellido==autores[i].apellido) {
            var existencia = true;
        }
    }
    //Si ya existe devuelve 409
    if (existencia){
        res.status(409).send("El autor ya existe");
    }
    //De lo contrario devuleve 201
    else {
        autores.push(req.body);
        res.status(201).json(req.body)
    }
});

//GET obtener Autor por id
server.get("/autores/:id", (req,res)=>{
    const id = req.params.id;
    //Si el existe devuleve 200
    if (id<autores.length){
        res.status(200).json(autores[id]);
    }
    //De lo contrario devuelve 404
    else{
        res.status(404).send("El id no existe");
    }
});

//DELETE eliminar Autor por id
server.delete("/autores/:id", (req,res) =>{
    const id = req.params.id;
    //Si el autor existe devuelve 204
    if (id<autores.length){
        autores.splice(id, 1);
        res.status(204).send("El autor fue eliminado");
    }
    //Si no existe devuelve 404
    else{
        res.status(404).send("El autor no existe")
    }
});

//PUT modificar Autor por id 
server.put("/autores/:id", (req,res) =>{
    const id = req.params.id;
    //Si el autor existe devuelve 200
    if (id<autores.length){
        autores.splice(id, 1, req.body);
        res.status(200).send("Se actualizó correctamente");
    }
    //Si no existe devuelve 404
    else{
        res.status(404).send("El autor no existe")
    }
});

//Libros por autor
server.get("/autores/:id/libros",(req,res)=>{
    const id = req.params.id;
    //autor no existe: 404
    if (id>=autores.length){
        res.status(404).send("El autor no existe");
    }
    //autor existe: 200
    else{
        res.status(200).json(autores[id].libros)
    }
})

//Agregar libro por autor
server.post("/autores/:id/libros",(req,res)=>{
    const id = req.params.id;
    //autor no existe: 404
    if (id>=autores.length){
        res.status(404).send("El autor no existe");
    }
    //autor existe: 201
    else{
        autores[id].libros.push(req.body);
        res.status(201).json(req.body);
    }
})

//Libros por id por autor
server.get("/autores/:id/libros/:idlibro",(req,res)=>{
    const id = req.params.id;
    const idlibro = req.params.idlibro;
    //autor no existe: 404
    if (id>=autores.length){
        res.status(404).send("El autor no existe");
    }
    //libro no existe: 404
    if (idlibro>=autores[id].libros.length){
        res.status(404).send("El libro no existe");
    }
    //autor y libro existen: 200
    else{
        res.status(200).json(autores[id].libros[idlibro]);
    }
})

//Modifica libro por id por autor
server.put("/autores/:id/libros/:idlibro",(req,res)=>{
    const id = req.params.id;
    const idlibro = req.params.idlibro;
    //autor no existe: 404
    if (id>=autores.length){
        res.status(404).send("El autor no existe");
    }
    //libro no existe: 404
    if (idlibro>=autores[id].libros.length){
        res.status(404).send("El libro no existe");
    }
    //autor y libro existen: 200
    else{
        autores[id].libros.splice(idlibro, 1, req.body);
        res.status(200).json(req.body);
    }
})

//Eliminar libro por id por autor
server.delete("/autores/:id/libros/:idlibro",(req,res)=>{
    const id = req.params.id;
    const idlibro = req.params.idlibro;
    //autor no existe: 404
    if (id>=autores.length){
        res.status(404).send("El autor no existe");
    }
    //libro no existe: 404
    if (idlibro>=autores[id].libros.length){
        res.status(404).send("El libro no existe");
    }
    //autor y libro existen: 200
    else{
        autores[id].libros.splice(idlibro, 1);
        res.status(204).send("se eliminó el libro correctamente")
    }
})