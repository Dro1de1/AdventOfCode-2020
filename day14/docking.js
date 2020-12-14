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


//part2
const memory1 = {}
let mask = ""
for (let line of file) {
    switch (line.slice(0,4)) {
        case ("mask"):
            mask = line.match(/mask = (.*)/)[1]
            break
        case ("mem["):
            let help = line.match(/mem\[(\d*)\] = (\d*)/)
            writeMem1(generateMasks1(changeMask1(mask, help[1])), help[2])
            break
    }
}
function changeMask1(mask, address) {
    address = address.toString(2)
    for (let i=0; i<address.length-mask.length;i++) {
        address = "0"+address
    }
    let output = ""
    for (let i=0;i<address.length;i++) {
        let maskChar = mask.charAt(i)
        let addressChar = address.charAt(i)
        switch (maskChar) {
            case ("0"):
                output += addressChar
                break
            case ("1"):
                output += maskChar
                break
            case ("X"):
                output += maskChar
                break
        }
    }
    return output
}

function generateMasks1(mask) {
    let masks = []
    let count = mask.split("X").length -1
    console.log(count, 2**count)
    let bin = ""
    for (let i=0;i<count;i++) {
        bin += "1"
    }
    bin = +("0b"+bin)
    console.log(bin)
    let help = false
    masks.push(mask)
    masks.forEach(line=> help ||= line.includes("X"))
    while (help) {
        let length = masks.length
        for (let i=0;i<length;i+=2) {
            masks.splice(i+1,0,masks.slice(i,i+1)[0].replace("X","0"))
            masks[i] = masks[i].replace("X","1")
            length++
        }
        help = false
        masks.forEach(line=> help ||= line.includes("X"))
        console.log(masks)
    }
    return masks
}
function writeMem1(addresses, payload) {
    // console.log(+address, +payload)
    for (let i=0;i<addresses.length;i++) {
        memory1[BigInt("0b"+addresses[i])] = payload
    }

}
console.log(memory1)
// let result1 = BigInt(0)
// for (let key of Object.keys(memory)) {
//     result += memory[key]
// }