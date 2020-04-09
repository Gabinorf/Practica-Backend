var moment = require("moment");
var fecha = new moment ("31/12/2019", "DD/MM/YYYY");
var formateada = fecha.format("MM/DD/YY");

//console.log(formateada);

const coolImages = require("cool-images");
 
//console.log(coolImages.one());

const images = coolImages.many(600,800,10);
let texto ="";

images.forEach(element => {
    const url = element;
    texto += url + "\n";
});

//console.log(texto);

const fs = require("fs");



  fs.appendFile('log.txt', moment().format('MMMM Do YYYY, h:mm:ss a')+"\n"+texto+"\n\n", (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });

