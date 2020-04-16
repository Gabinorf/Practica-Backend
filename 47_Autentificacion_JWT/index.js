const jwt = require('jsonwebtoken');
const express = require('express');
const server = express();
var cors = require('cors')
const mi_pass_jwt = 'my_secret_password';
const usuarios = [
    {user: 'moises', pass: 'pass'},
    {user: 'nelson', pass: 'pass'}
];

server.use(express.json());
server.use(cors())

const validarUser = (request, response, next) => {
    let token = request.headers.authorization;
console.log(token);
    try {
        decode = jwt.verify(token, mi_pass_jwt);
        console.log(decode)
        if(decode){
            request.user = decode;
            next();
        }else{
            throw "No permmision";
        }
    } catch (error) {
        response.status(401).json({msj: 'invalid login'})
    }
}

server.post('/login', (request, response) => {
    console.log(request.body);
    let {user, pass} = (request.body);
    usuarios.forEach(function(usuario){
        if(usuario.user == user && usuario.pass == pass){
            let token = jwt.sign(user, mi_pass_jwt);
            response.status(200).json({token: token})
        }
    });

    response.status(401).json({msj: 'invalid login'})
});

server.get('/publico', (request, response) => {
   response.json({msj: 'respuesta publica'})
});

server.get('/privado', validarUser, (request, response) => {
   response.json({msj: 'hola ' + request.user})
});

//