const fs = require("fs")
const  file = fs.readFileSync("./documents.txt", "utf8").trim().split("\n\n").map(scan=>scan.replaceAll("\n"," ")).map(scan=>scan.split(" ")).map(scan=>{
    let rtn = {}
    for (i=0;i<scan.length;i++) {
        let entry = scan[i]
        rtn[(entry.substring(0,3))] = entry.substring(4,entry.length)
    }
    return rtn
})

//part1
const properties = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"/* ,
    "cid" */
]
let validPassports = 0
file.forEach(scan=>{
    let valProps = 0
    for (i=0;i<properties.length;i++) {
        if (scan.hasOwnProperty(properties[i])) valProps++
    }
    if (valProps === properties.length) validPassports++
})
console.log(validPassports)


//part2
const properties1 = [
    ["byr",input => {
        let outcome = /^[0-9]{4}$/.exec(input)
        if (outcome === null) return false
        let number = outcome[0]*1
        return (1920<=number&&number<=2002)
    }],
    ["iyr",input => {
        let outcome = /^[0-9]{4}$/.exec(input)
        if (outcome === null) return false
        let number = outcome[0]*1
        return (2010<=number&&number<=2020)
    }],
    ["eyr",input => {
        let outcome = /^[0-9]{4}$/.exec(input)
        if (outcome === null) return false
        let number = outcome[0]*1
        return (2020<=number&&number<=2030)
    }],
    ["hgt",input => {
        let outcome = /^([0-9]*)(cm$|in$)/.exec(input)
        if (outcome === null) return false
        let number = outcome[1]*1
        if (outcome[2] === "cm") {
            return (150<=number&&number<=193)
        }
        if (outcome[2] === "in") {
            return (59<=number&&number<=76)
        }
        return false
    }],
    ["hcl",input => {
        let outcome = /^#[0-9a-f]{6}$/.exec(input)
        return (outcome !== null)
    }],
    ["ecl",input => {
        let outcome = /^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$/.exec(input)
        return (outcome !== null)
    }],
    ["pid",input => {
        let outcome = /^[0-9]{9}$/.exec(input)
        return (outcome !== null)
    }]/* ,
    "cid" */
]
let validPassports1 = 0
file.forEach(scan=>{
    let hasProps = 0
    let valProps = 0
    let propsLength = properties1.length
    for (i=0;i<propsLength;i++) {
        if (scan.hasOwnProperty(properties1[i][0])) hasProps++
    }
    if (hasProps === propsLength) {
        for(i=0;i<propsLength;i++) {
            properties1[i][1](scan[properties1[i][0]]) ? valProps++ : null // console.log("wrong", properties1[i][0], scan[properties1[i][0]])
        }
        if (valProps === propsLength) validPassports1++
    }
})
console.log(validPassports1)
