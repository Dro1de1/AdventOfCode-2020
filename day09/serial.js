const fs = require("fs")
const file = fs.readFileSync("./portOut.txt", "utf8").trim().split("\n").map(n => +n)

function look(index) {
    let number = file[index]
    let preamble = file.slice(index-25,index)
    forLoop:
    for (let i=0,length=preamble.length; i<length-1; i++) {
        forLoop1:
        for (let j=i; j<length; j++) {
            if (number===preamble[i]+preamble[j]) return [true, preamble[i], preamble[j]]
        }
    }
    return [false]
}

//part1
let weakNumber = 0
for (i=25,length=file.length-25;i<length;i++) {
    if (!look(i)[0]) {
        weakNumber = file[i]
        break
    }
}
console.log("part1:", weakNumber)


//part2
function contiguos() {
    //https://github.com/paolostyle/advent-of-code-2020/blob/master/src/day-9.js
    //looks better that mine, plus it used Math.min(...slice)+Math.max(...slice) instead of my slice[0]+slice[slice.length-1]
    let start = 0;
    let end = 0;
    let sum = 0;
    let slice = [];
    while (sum !== weakNumber) {
        slice = file.slice(start, end);
        sum = slice.reduce((acc, val) => acc + val, 0);
        if (sum < weakNumber) end += 1;
        if (sum > weakNumber) start += 1;
    }
    return Math.min(...slice) + Math.max(...slice)
}
console.log("part2:", contiguos())