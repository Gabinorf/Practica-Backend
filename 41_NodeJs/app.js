const calculator = require("./calculator");
const fs = require("fs");

//Realizar cualquier operación y guardar en un archivo log.txt
const calculadora = (valor1,valor2,operacion)=>{
    let texto;
    switch (operacion){
        case "suma":
        texto = valor1+" "+"+"+" "+valor2+" "+"="+" "+calculator.suma(valor1,valor2);
        break
        case "resta":
        texto = valor1+" "+"-"+" "+valor2+" "+"="+" "+calculator.resta(valor1,valor2);
        break
        case "multiplicar":
        texto = valor1+" "+"*"+" "+valor2+" "+"="+" "+calculator.multiplicar(valor1,valor2);
        break
        case "dividir":
        texto = valor1+" "+"/"+" "+valor2+" "+"="+" "+calculator.dividir(valor1,valor2);
        break
    }
    fs.appendFile("log.txt", texto+"\n",function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

calculadora(25,5,"dividir");