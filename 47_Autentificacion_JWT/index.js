const jwt = require('jsonwebtoken');
const express = require('express');
const server = express();
var cors = require('cors');

const firma_jwt = 'secret_password';
const usuarios = [
    {user: 'gabino', pass: '1234'},
    {user: 'sebastian', pass: '4321'}
];

server.listen(3000, () => {
    console.log("Servidor iniciado...");
})

server.use([express.json(), cors()]);


/******************************************************************
        EJEMPLOS
******************************************************************/

const validarUsuario = (req,res,next) => {
    let {user, pass} = req.body;
    usuarios.forEach( (usuario)=>{
        if( usuario.user == user && usuario.pass == pass ){
            let token = jwt.sign(user, firma_jwt);
            res.status(200).json({token: token})
        }
    });
    res.status(401).json({msj: 'Usuario o Contraseña inválido'})
    next()
}

const autorizarUsuario = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        decode = jwt.verify(token, firma_jwt);
        if(decode){
            req.user = decode;
            next();
        }else{
            throw "Sin permiso";
        }
    } catch (error) {
        res.status(401).json({msj: 'Login inválido'})
    }
}

server.post('/autorizacion', validarUsuario, (req, res) => {   
});

server.get('/publico', (request, response) => {
   response.json({msj: 'Respuesta pública'})
});

server.get('/privado', autorizarUsuario, (request, response) => {
   response.json({msj: 'hola ' + request.user})
});



/*********************************************************************
        ACTIVIDAD
*********************************************************************/

let users = [];
class Users{
    constructor(id,nombre,apellido,email,contrasena){
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.email = email,
        this.contrasena = contrasena    
    }
}  

//Mostrar usuarios
server.get("/users",(req,res)=>{
    res.json(users);
})

//Crear usuarios
server.post("/signin",(req,res)=>{
    const {id,nombre,apellido,email,contrasena}=req.body;
    const usuario = new Users(id,nombre,apellido,email,contrasena);
    users.push(usuario);
    res.status(200).json({msj: "Se agregó usuario correctamente"})
})

//Editar usuarios mediante el email
server.put("/edit",(req,res)=>{
    users.forEach((element)=>{
        if (element.email == req.query.email){
            element.id = req.body.id;
            element.nombre = req.body.nombre;
            element.apellido = req.body.apellido;
            element.email = req.body.email;
            element.contrasena = req.body.contrasena;
            res.status(201).json({msj: "Se modificó correctamente"})
        }
    })
    res.status(400).json({msj: "No se encontró el Usuario"})
})

//Agregar es_admin
server.put("/users/:id",(req,res)=>{
    const id = req.params.id;
    users[id].es_admin = req.body.es_admin;
    res.json({msj: "se actualizó el estado del usuario"})
})

const valUser = (req,res,next) => {
    let {email, contrasena} = req.body;
    users.forEach( (elemento)=>{
        if( elemento.email == email && elemento.contrasena == contrasena ){
            let token = jwt.sign(email, firma_jwt);
            res.status(200).json({token: token})
        }
    });
    res.status(401).json({msj: 'Usuario o Contraseña inválido'})
    next()
}

//Login
server.post('/login', valUser, (req, res) => {   
});


const autUser = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        decode = jwt.verify(token, firma_jwt);
        if(decode){
            req.email = decode;
            next();
        }else{
            throw "Sin permiso";
        }
    } catch (error) {
        res.status(401).json({msj: 'Login inválido'})
    }
}

//Acceso específico
server.get('/private', autUser, (req, res) => {
    users.forEach((elemento)=>{
        if (elemento.email == req.email &elemento.es_admin == true){
            res.json(users)
        }
    })
    res.json({msj: "Información no autorizada"})
 });

 