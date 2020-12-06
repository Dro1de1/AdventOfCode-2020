const fs = require("fs")
const file = fs.readFileSync("./answers.txt", "utf8").trim().split("\n\n").map(group=>group.split("\n"))

//part1
let total = 0
file.forEach(group=>{
    let answered = ""
    group.forEach(person => {
        for (i=0;i<person.length;i++) {
            let curChar = person.substring(i,i+1)
            if (-1===answered.indexOf(curChar)) answered+=curChar
        }
    })
    total += answered.length
})
console.log(total)


//part2
let total1 = 0
file.forEach(group=>{
    let allAnswered = group[0]
    group.forEach(person => {
        let allAnsweredHere = allAnswered
        for (i=0;i<allAnswered.length;i++) {
            let curChar = allAnswered.substring(i,i+1)
            let help = person.indexOf(curChar)
            if (-1===help) allAnsweredHere = allAnsweredHere.replace(curChar,"")
        }
        allAnswered = allAnsweredHere
    })
    console.log(allAnswered)
    total1 += allAnswered.length
})
console.log(total1)
