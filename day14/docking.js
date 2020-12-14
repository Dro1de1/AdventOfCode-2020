const fs = require("fs")
// const file = fs.readFileSync("./initialization.txt", "utf8").trim().split("\nmask = ").map(n => n.split("\n"))
const file = fs.readFileSync("./initialization.txt", "utf8").trim().split("\n")

const memory = {}
let maskAdd = 0
let maskSub = 0

for (let line of file) {
    switch (line.slice(0,4)) {
        case ("mask"):
            changeMask(line.match(/mask = (.*)/)[1])
            break
        case ("mem["):
            let help = line.match(/mem\[(\d*)\] = (\d*)/)
            writeMem(help[1], help[2])
            break
    }
}
function changeMask(mask) {
    // console.log(mask)
    maskAdd = BigInt("0b"+mask.replaceAll(/X/g,"0"))
    maskSub = BigInt("0b"+mask.replaceAll(/X/g,"1"))
    // console.log(maskAdd.toString(2), maskSub.toString(2))
}
function writeMem(address, payload) {
    // console.log(+address, +payload)
    payload = BigInt(payload)
    payload |= maskAdd
    payload &= maskSub
    memory[address] = payload

}

let result = BigInt(0)
for (let key of Object.keys(memory)) {
    result += memory[key]
}
console.log("part1:", result)