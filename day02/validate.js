const fs = require("fs")
const file = fs.readFileSync("passwords.txt", "utf8")
console.log(file)
file.forEach(pw => console.log("jhal",pw))


//console.log(file)
