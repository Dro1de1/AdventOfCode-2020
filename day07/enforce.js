// https://github.com/TheMorpheus407/AdventOfCode2020/blob/master/seven.py
const fs = require("fs")
const bags = {}
const file = fs.readFileSync("./bags.txt", "utf8").trim().split("\n").map(bag => {
    return bag.match(/(.*) bags contain (.*)\./)
}).forEach(bag => {

    let splitEntry = [...bag[2].matchAll(/(\d+) (.+?) bag/g)]
    bags[bag[1]] = []
    if (splitEntry.length>0) {
        splitEntry.forEach(element => {
            bags[bag[1]].push([+element[1],element[2]])
        })
    }
    else {
        bags[bag[1]].push([0,""])
    }
})

//part1
function reFind(color) {
    if (color === "shiny gold") {
        return true
    } else if (color === "") {
        return false
    } else {
        let val = false
        bags[color].forEach(ele => val = val || reFind(ele[1]))
        return val
    }
}
let final = 0
Object.keys(bags).forEach(element => {
    final += reFind(element) ? 1 : 0

})
console.log("part1:", final-1)


//part2
function reCount(color) {
    if (color === "") return 1
    else {
        let times = 0
        bags[color].forEach(ele => {
            let count1 = reCount(ele[1])
            times += ele[0]*(count1===0?1:count1)
        })
        return 1 + times
    }
}
console.log("part2:",reCount("shiny gold")-1)
