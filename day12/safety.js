const { createSecretKey } = require("crypto")
const fs = require("fs")
const file = fs.readFileSync("./actions.txt", "utf8").trim().split("\n").map(n => [n.slice(0,1),+n.slice(1)])

console.log(file)

const ship = {
    "facingLR":90,
    "NorthSouth":0,
    "EastWest":0,
    "move":(input) => {
        switch (input[0]) {
            case ("N"):
                NorthSouth+=input[1]
                break
            case ("S"):
                NorthSouth-=input[1]
                break
            case ("E"):
                EastWest+=input[1]
                break
            case ("W"):
                EastWest-=input[1]
                break
            case ("L"):
                facingLR-=input[1]
                break
            case ("R"):
                facingLR+=input[1]
                break
            case ("F"):
                // switch (facingLR%90) {
                //     case ():
                //         break
                // }
                break
        }
    }
}

for (let instruction of file) {
    ship.move(instruction)
}