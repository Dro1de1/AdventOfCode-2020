const { timeStamp } = require("console")
const fs = require("fs")
// const file = fs.readFileSync("./lines.txt", "utf8").trim().split("\n").map(n => n.split(","))
const file = fs.readFileSync("./test.txt", "utf8").trim().split("\n").map(n => n.split(","))

let offset = 0
for (let i=0;i<file[1].length;i++) {
    let line = file[1][i]
    if (line === "x") {
        offset++
    } else {
        file[1][i] = [+line, offset++]
    }
}
let help = file[1].indexOf("x")
while (help >= 0) {
    file[1].splice(help,1)
    help = file[1].indexOf("x")
}

//part1
file[1] = file[1].map(line => [line[0],line[1], line[0]-(file[0]%line[0])])
file[1].forEach(line => line.includes(Math.min(...file[1].map(line => line[2]))) ? console.log("part1:", line[0]*line[2]): null)
