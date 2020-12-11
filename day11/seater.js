const fs = require("fs")
const _ = require('lodash');

// const file = fs.readFileSync("./test.txt", "utf8").trim().split("\n")
const file = fs.readFileSync("./seats.txt", "utf8").trim().split("\n")

let intervalls = [
    [-1,-1],[-1,0],[-1,1],
    [0,-1],/* [0,0], */[0,1],
    [1,-1],[1,0],[1,1]
]
let lastNormal = []
let normal = [...file]
let cache = []
while (!_.isEqual(lastNormal, normal)) {
    cache = [...normal]
    seatingRound(5, true)
    lastNormal = [...normal]
    normal = [...cache]
}
console.log(normal, countOccupied())


function seatingRound(tolerance, onVisible) {
    for (let i=0;i<normal.length;i++) {
        
        for (let j=0;j<normal[i].length;j++) {
            
            switch (normal[i].charAt(j)) {
                case ("."):
                    break
                case ("L"):
                    if (checkOccupied1([i,j], onVisible)===0) replaceChar([i,j],"#")
                    break
                case ("#"):
                    if (checkOccupied1([i,j], onVisible)>=tolerance) replaceChar([i,j],"L")
                    break
            }
        }
    }
    
}

function checkOccupied1(coordinates, onVisible) {
    let occupied = 0
    for (let i=0;i<8;i++) {
        let nextCoordinates = [coordinates[0]+intervalls[i][0], coordinates[1]+intervalls[i][1]]
        if (search(nextCoordinates, intervalls[i], onVisible)) occupied++
    }
    return occupied
}

function search(coordinates, intervall, onVisible) {
    if (normal[coordinates[0]] === undefined) return false
    switch (normal[coordinates[0]].charAt(coordinates[1])) {
        case (undefined):
            return false
        case ("."):
            let nextCoordinates = [coordinates[0]+intervall[0],coordinates[1]+intervall[1]]
            return onVisible ? search(nextCoordinates, intervall) : false
        case ("#"):
            return true
    }
}

function replaceChar(coordinates, replaceChar) {
    cache[coordinates[0]] = cache[coordinates[0]].substring(0, coordinates[1]) + replaceChar + cache[coordinates[0]].substring(coordinates[1] + 1)
}

function countOccupied() {
    let count = 0
    for (let row of normal) {
        for (let place of row) {
            place === "#" ? count++ : null
        }
    }
    return count
}