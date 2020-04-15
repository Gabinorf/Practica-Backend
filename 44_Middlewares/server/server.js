const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const fs = require("fs");

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use([bodyParser.json(), agregarLog, validarError]);

const contactos =[
    {
        nombre: 'Gabino',
        apellido: 'Rodríguez',
        email: 'grf@gmail.com',
        id: 0
    }
];


/***********************
    RUTAS
************************/

//Ver contactos
server.get("/demo", qString, (req,res)=>{
    res.send(contactos);                          
});

//Agregar contacto
server.post("/contacto", [comprobarInfo, comprobarExist], (req,res)=>{
    const obj = req.body;
    obj.id = contactos.length;
    res.send("Se agregó el contacto correctamente con el id: "+contactos.length);
    contactos.push(obj);
});


/**************************
    MIDDLEWARES
**************************/    

//Guarda en un txt {verbo}-{ruta}-{query string}-{body}
function agregarLog(req,res,next){       
    const texto = `${req.method} - ${req.path} - ${JSON.stringify(req.query)} - ${JSON.stringify(req.body)}`; 
    fs.appendFile('log.txt', texto+"\n" , (err) => {
        if (err) throw err;
        console.log('La información fue agregada al archivo log.txt');
    });
    next();
}

//Comprueba que los campos no estén vacíos
function comprobarInfo(req,res,next){
    const {nombre, apellido, email} = req.body;
    if (!nombre || !apellido || !email){
        res.statusCode = 400;
        res.send("Falta información");
    }
    else{
        next();
    }
}

//Comprueba que el contacto no exista
function comprobarExist(req,res,next){
    const {nombre, apellido, email} = req.body;
    
    for (let i=0; i<contactos.length; i++){
        if (contactos[i].nombre==nombre & contactos[i].apellido==apellido){
            res.statusCode = 409;
            res.send("El contacto ya existe");
            var existencia = true;
        }
    }
    if(!existencia){
        next();
    }
}

//Comprueba que el query string exista y sea mayor a 5
function qString(req,res,next){
    
    if (Object.keys(req.query).length!=0){
        if(req.query.version<6){
            res.statusCode = 422;
            res.send("La versión debe ser mayor a 5");
        }
        else{
            next()
        }
    }
    else{
        res.send("Debe existir un query string (version > 5)")
    }   
}

//Validación de errores
function validarError(err,req,res,next){
    if (!err) return next();
    console.log("Error, algo salio mal", err);
    res.status(500).send('Error');
}