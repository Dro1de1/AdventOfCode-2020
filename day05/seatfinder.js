const fs = require("fs")
const file = fs.readFileSync("./seatNrs.txt", "utf8").trim().split("\n").map(line=>{
    let row = +("0b"+line.substring(0,7).replaceAll("F","0").replaceAll("B","1"))
    let column = +("0b"+line.substring(7,10).replaceAll("L","0").replaceAll("R","1"))
    let seatID = row*8+column
    return [row, column, seatID]
})

//part1
file.sort((a,b)=>a[2]-b[2])
console.log(file[file.length-1][2])


//part2
let lastID = file[0][2]
for (i=1;i<(file.length-1);i++) {
    if (++lastID === file[i][2]) continue
    console.log(lastID++)
}
