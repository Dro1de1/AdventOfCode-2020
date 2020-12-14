const { timeStamp } = require("console")
const fs = require("fs")
const file = fs.readFileSync("./lines.txt", "utf8").trim().split("\n").map(n => n.split(","))
// const file = fs.readFileSync("./test.txt", "utf8").trim().split("\n").map(n => n.split(","))

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

console.log(file)

//part2
// let bottom = 100000000000000
let bottom = 1000000000000000
// let times = 100000000000001
let count = bottom/file[1][0][0]
// let count = 99999
while1:
while (count>0) {
    let timestamp = file[1][0][0]*count
    console.log(timestamp)
    // if (timestamp === 1068781) {
    //     console.log( )
    // }
    let check = 0
    for (let i=0;i<file[1].length;i++) {
        let line = file[1][i]
        if ((timestamp+line[1])%line[0]===0) {
            // console.log("bus:", check, line[0])
            check++
        }
    }
    if (check === file[1].length) {
        console.log(check, file[1].length, timestamp)
        break while1
    }
    count++
    // if (count===bottom+times) process.exit()
}