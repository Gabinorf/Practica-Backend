const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mi_base");

server.listen(3000, () => {
    console.log("Servidor iniciado...");
});

server.use(bodyParser.json());


/*****************************************************
        EJEMPLO DE CLASE
*****************************************************/

//Creo un modelo, la Key es el identificador y el Valor es el tipo de dato
const Usuarios = mongoose.model("Usuarios", {
    nombre: String,
    apellido: String,
    edad: Number
});

let mis_datos = {nombre: 'Martín', apellido: 'Guzman', edad: 25};
const objeto_usuarios = new Usuarios(mis_datos);

//Guarda en mi DB
function guardar(){
    objeto_usuarios.save();
}

//Recuperar documentos de la base de datos
function mostrar(){
    Usuarios.find()
        .then(resultados=>{
            //Array de objetos
            console.log(resultados)
        });
}

//Buscar documentos
function buscar(){
    Usuarios.find({nombre: "Martín"}).then(resultados=>{
        console.log(resultados)
    })
}

//Buscar resultados que no sean exactos
function buscar_2(){
    Usuarios.find({'nombre' : new RegExp('Mar','i')}).then(resultados=>{
        console.log(resultados)
    })
}

//Buscar un elemento (primero) y sobreescribirlo
function buscar_3(){
    Usuarios.findOne({'nombre' : new RegExp('mar','i')}).then(resultado=>{
        resultado.nombre = 'Nicolás';
        resultado.save();
    })
}

//Actualizar 
function actualizar(){
    Usuarios.updateOne({'nombre' : new RegExp('ism','i')}, {nombre: 'Daniel'}).then((err,res)=>{
        console.log(res)
    })
}

//Eliminar
function eliminar(){
    Usuarios.deleteOne({'nombre' : new RegExp('ism','i')}).then((err,res)=>{
        console.log(res)
    })
}

// guardar();
// mostrar();
// buscar();
// buscar_2();
// buscar_3();
// actualizar();
// eliminar();



/**************************************************************
        ACTIVIDAD
***************************************************************/

const Inmuebles = mongoose.model('Inmuebles',{
    tipo_de_operacion: String,
    tipo_de_inmueble: String,
    direccion: String,
    fotos: Array,
    ambientes: Number,
    metros_cuadrados: Number,
    descripcion: String,
    datos_propietario: Array
})

//Mostrar inmuebles
server.get('/inmuebles',(req,res)=>{
    Inmuebles.find().then(resultados=>{
        res.status(200).json(resultados)
    })
})

//Mostrar por id
server.get('/inmueble',(req,res)=>{
    const id = req.query.id;
    Inmuebles.findOne({_id: id}).then(resultados=>{
        res.status(200).json(resultados)
    })
})

//Agregar inmueble
server.post('/inmueble',(req,res)=>{
    const inmueble = new Inmuebles(req.body);
    inmueble.save()
    res.status(201).json({msj: "Se agregó correctamente"})
})

//Modificar inmueble
server.put('/inmueble',(req,res)=>{
    const id = req.query.id;
    Inmuebles.updateOne({_id: id}, req.body).then((err,resp)=>{
        res.status(200).json({msj: "Actualizado"})
    })
})

//Eliminar inmueble
server.delete("/inmueble",(req,res)=>{
    const id = req.query.id;
    Inmuebles.deleteOne({_id: id}).then((err,resp)=>{
        res.status(204).json({msj: "Eliminado"})
    })
})