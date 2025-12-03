let fs = require('fs')
let path = require('path')

let Filename = "loger.log";
let Filepath = path.join(__dirname, "..", Filename)

let loger = (req, res, next)=>{
    let log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    fs.appendFile(Filepath, log, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
}

module.exports = loger;
