const _ = require('lodash')
const fs = require("fs")
const file = fs.readFileSync("./actions.txt", "utf8").trim().split("\n").map(n => [n.slice(0,1),+n.slice(1)])

function Ship(file) {
    this.faceings = [
        "E",
        "S",
        "W",
        "N"
    ]
    this.facingLR = this.faceings[0]
    this.northSouth = 0
    this.eastWest = 0
    this.move = (input) => {
        if (input[0] === "F") input[0] = this.facingLR
        switch (input[0]) {
            case ("N"):
                this.northSouth+=input[1]
                break
            case ("S"):
                this.northSouth-=input[1]
                break
            case ("E"):
                this.eastWest+=input[1]
                break
            case ("W"):
                this.eastWest-=input[1]
                break
            case ("L"):
                let help = (this.faceings.indexOf(this.facingLR)-input[1]/90)%4
                this.facingLR = this.faceings[help < 0 ? 4+help : help]
                break
            case ("R"):
                this.facingLR = this.faceings[(this.faceings.indexOf(this.facingLR)+input[1]/90)%4]
                break
        }
    }
}
// const ship = new Ship()
// for (let instruction of file) {
//     ship.move(instruction)
//     // console.log(instruction,ship)
// }
// console.log("part1:", Math.abs(ship.northSouth)+Math.abs(ship.eastWest))




const transforms = [
    ([x, y]) => [x, y],
    ([x, y]) => [y, -x],
    ([x, y]) => [-x, -y],
    ([x, y]) => [-y, x],
  ];
  
  function rotateBy(dir, by) {
    return transforms[(((by / 90) % 4) + 4) % 4](dir);
  }
function Ship1() {
    this.faceings = [
        "E",
        "S",
        "W",
        "N"
    ]
    this.waypoint = {
        "northSouth": 0,
        "eastWest": 0
    }
    this.facingLR = this.faceings[0]
    this.northSouth = 0
    this.eastWest = 0
    this.move = (input) => {
        switch (input[0]) {
            case ("F"):
                this.northSouth += input[1]*this.waypoint.northSouth
                this.eastWest += input[1]*this.waypoint.eastWest
                break
            case ("N"):
                this.waypoint.northSouth+=input[1]
                break
            case ("S"):
                this.waypoint.northSouth-=input[1]
                break
            case ("E"):
                this.waypoint.eastWest+=input[1]
                break
            case ("W"):
                this.waypoint.eastWest-=input[1]
                break
            case ("L"):
                input[0] = "R"
                input[1] = -input[1]
            case ("R"):
                let help = rotateBy([this.waypoint.eastWest,this.waypoint.northSouth], input[1])
                this.waypoint.eastWest = help[0]
                this.waypoint.northSouth = help[1]
                break
        }
    }
}
const ship1 = new Ship1()
for (let instruction of file) {
    ship1.move(instruction)
    console.log(instruction,ship1,ship1.waypoint)
}
console.log("part2", Math.abs(ship1.northSouth)+Math.abs(ship1.eastWest))
