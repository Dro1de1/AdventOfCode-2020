const fs = require("fs")
//make the date usefull
let file = fs.readFileSync("passwords.txt", "utf8").trim().split("\n").map(pw => pw.split(" ")).map(line => {
    return {
        min : line[0].split("-")[0]-0,
        max : line[0].split("-")[1]-0,
        letter : line[1].split(":")[0],
        pw : line[2]
    }
})

//part1
let masterCount = 0
file.forEach(pw => {
    let count = 0
    for (i=0,length=pw.pw.length;i<length;i++) {
        if (pw.pw.charAt(i) === pw.letter) count++
    }
    if ((pw.min<=count)&&(count<=pw.max)) masterCount++
})
console.log(masterCount)


//part2
let masterCount1 = 0;
file.forEach(pw => {
    let count = 0
    if ((pw.pw.charAt(pw.min-1)===pw.letter)&&(pw.pw.charAt(pw.max-1)===pw.letter)) {}
    else if ((pw.pw.charAt(pw.min-1)===pw.letter)||(pw.pw.charAt(pw.max-1)===pw.letter)) masterCount1++
})
console.log(masterCount1)