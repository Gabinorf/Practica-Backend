//Creo funciones
const suma = (valor1,valor2) => valor1 + valor2;
const resta = (valor1,valor2) => valor1 - valor2;
const multiplicar = (valor1,valor2) => valor1 * valor2;
const dividir = (valor1,valor2) => valor1 / valor2;
const mensaje = () => "El resultado es : "; 

//Exporto funciones
module.exports = {suma, mensaje, resta, multiplicar, dividir};