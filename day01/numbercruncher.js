const fs = require("fs")
console.log("hallo")
const numbers = fs.readFileSync("./numbers.txt", "utf8").split("\n").map( n => parseInt(n, 10))
console.log(numbers)
console.log("end")

for (let i=0;i<numbers.length;i++) {
	for (let j=0;j<numbers.length;j++) {
		console.log(" >")
		if (x+y === 2020) console.log("zwei", x*y)
		for (let k=0;k<numbers.length;k++) {
			if (numbers[i]+numbers[j]+numbers[k] == 2020) console.log("test", x*y*z)
