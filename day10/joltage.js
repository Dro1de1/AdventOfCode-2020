const fs = require("fs")
const file = fs.readFileSync("./adapters.txt", "utf8").trim().split("\n").map(n => +n)

file.push(Math.max(...file)+3)
file.unshift(0)

file.sort((a,b) => {
    return a-b
})

let sum = [0,0,0,0]

for (i=0,length=file.length-1;i<length;i++) {
    sum[file[i+1]-file[i]] += 1
}
console.log("part1:", sum[1]*sum[3])


//part2
//https://github.com/paolostyle/advent-of-code-2020/blob/master/src/day-10.js
const contSlices = []
let slice = []

for (let i = 0; i < file.length; i++) {
    slice.push(file[i])
    if (file[i] + 1 !== file[i + 1]) {
        contSlices.push(slice)
        slice = []
    }
}

const combinationsPerLength = {
    1: 1,
    2: 1,
    3: 2,
    4: 4,
    5: 7,
    6: 13,
}

let part2 = contSlices.map((s) => combinationsPerLength[s.length]).reduce((prod, i) => prod * i)
console.log("part2:", part2)
