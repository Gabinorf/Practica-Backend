const fs = require("fs");

fs.readFile("./file.txt",{encoding: "utf-8"}, (err, data) => {  
    if (err) {
        return err;
    }    
    else {
        let dataMayuscula = data.toUpperCase();
        console.log(dataMayuscula);
        
        fs.writeFile("file.txt", dataMayuscula,function (err) {
            if (err) throw err;
            console.log('Replaced!');
        });
    }
})