const fs = require("fs")
const file = fs.readFileSync("./numbers.txt", "utf8").trim().split(",").map(n=>+n)

//part1
const part1start = process.hrtime();
const game = {}
let index = 1
for (let i=0;i<file.length-1;i++) {
    game[file[i]] = index++
}
let lastNumber = file[file.length-1]
let nextNumber = 0
for (index; index < 2020; index++) {
    nextNumber = (game[lastNumber] === undefined ? 0 : index - game[lastNumber])
    game[lastNumber] = index
    lastNumber = nextNumber
}
console.log("part1:", index, lastNumber, process.hrtime(part1start))


//part2
const part2start = process.hrtime();
const game1 = {}
let index1 = 1
for (let i=0;i<file.length-1;i++) {
    game1[file[i]] = index1++
}
let lastNumber1 = file[file.length-1]
let nextNumber1 = 0
for (index1; index1 < 30000000; index1++) {
    nextNumber1 = (game1[lastNumber1] === undefined ? 0 : index1 - game1[lastNumber1])
    game1[lastNumber1] = index1
    lastNumber1 = nextNumber1
    console.log(index1)
}
console.log("part2:", index1, lastNumber1, process.hrtime(part2start))