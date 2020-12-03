const fs = require("fs")
const  file = fs.readFileSync("./section.txt", "utf8").trim().split("\n")

let hitTrees = 0
let vertical = 0
let sectionLength = file[0].length
//part1
for (i = 0, vertical = 0, length = file.length; i < length; i++, vertical = (vertical + 3) % sectionLength) {
    // let index = i
    if (file[i].charAt(vertical) === "#") hitTrees++
    // console.log(i, vertical, file[i].length)
}
console.log(hitTrees)

//part2
movementRightDown = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]
let outcome = 1
let hitTrees1 = 0
for (let movement of movementRightDown) {
    for (j = 0,vertical = 0, length = file.length; j < length; j += movement[1], vertical = (vertical + movement[0]) % sectionLength) {
        if (file[j].charAt(vertical) === "#") hitTrees1++
    }
    outcome *= hitTrees1
    hitTrees1 = 0
}
console.log(outcome)