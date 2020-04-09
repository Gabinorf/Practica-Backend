const fs = require("fs");

fs.readFile("./file.txt",{encoding = "utf-8"}, (err, data) => {
    
    if (err) {
        return err;
    }    
    else {
        data.toUpperCase();
    }
  });