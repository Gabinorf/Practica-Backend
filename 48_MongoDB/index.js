const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mi_base");

const Usuarios = mongoose.model("Usuarios", {
    nombre: String,
    apellido: String,
    edad: Number
});

let mis_datos = {nombre: 'Martín', apellido: 'Guzman', edad: 25};
const objeto_usuarios = new Usuarios(mis_datos);
objeto_usuarios.save();

//Recuperar documentos de la base de datos
Usuarios.find()
    .then(resultados=>{
        console.log(resultados)
    });

//    