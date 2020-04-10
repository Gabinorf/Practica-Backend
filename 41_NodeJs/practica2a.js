//Librería librería para interactuar con archivos del sistema
const fs = require("fs");

fs.writeFile("file.txt", "Hola mundo, este es el texto",function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });