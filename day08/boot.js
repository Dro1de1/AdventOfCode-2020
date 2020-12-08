const fs = require("fs")
const file = fs.readFileSync("./instructions.txt", "utf8").trim().split("\n").map(instruction => {
    let help = instruction.split(" ")
    return [
        help[0],
        +help[1],
        false
    ]
})

function boot(instructions) {
    let accumulator = 0
    let hasBroke = false
    forLoop:
    for (i=0,length=instructions.length; i<length; i++) {
        let instr = instructions[i]
        if (instr[2]) {
            hasBroke = true
            break forLoop
        }
        switchStatement:
        switch (instr[0]) {
            case "acc":
                accumulator += instr[1]
                break switchStatement

            case "jmp":
                i += instr[1]-1
                break switchStatement

            case "nop":
                break switchStatement
        }
        instr[2] = true
    }
    removeUsed(instructions)
    return [accumulator, hasBroke]
}
function removeUsed(instructions) {
    for (instr of instructions) {
        instr[2] = false
    }
}

//part1
console.log("part1:", boot(file)[0])


//part2
let jmps = []
file.forEach(instr => {
    if (instr[0]==="jmp") jmps.push(file.indexOf(instr))
})
for (let jmp of jmps) {
    file[jmp][0]="nop"
    let bootAnsw = boot(file)
    file[jmp][0]="jmp"
    if (!bootAnsw[1]) {
        console.log("part2:", bootAnsw[0])
        break
    }
}
