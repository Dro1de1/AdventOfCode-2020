//https://github.com/leyanlo/advent-of-code/blob/main/2020/day-12.js

const fs = require("fs")

const inputIdx = 1;

const transforms = [
  ([x, y]) => [x, y],
  ([x, y]) => [y, -x],
  ([x, y]) => [-x, -y],
  ([x, y]) => [-y, x],
];

function rotateBy(dir, by) {
  return transforms[(((by / 90) % 4) + 4) % 4](dir);
}

function solve1(input) {
  let pos = [0, 0];
  let dir = [1, 0];
  for (let line of input) {
    let [, action, value] = line.match(/(\w)(\d+)/);
    value = +value;
    switch (action) {
      case 'N':
        pos = [pos[0], pos[1] + value];
        break;
      case 'S':
        pos = [pos[0], pos[1] - value];
        break;
      case 'E':
        pos = [pos[0] + value, pos[1]];
        break;
      case 'W':
        pos = [pos[0] - value, pos[1]];
        break;
      case 'L':
        dir = rotateBy(dir, -value);
        break;
      case 'R':
        dir = rotateBy(dir, value);
        break;
      case 'F':
        pos = [pos[0] + value * dir[0], pos[1] + value * dir[1]];
        break;
    }
  }
  console.log(pos.reduce((sum, n) => sum + Math.abs(n), 0));
}

function solve2(input) {
  let pos = [0, 0];
  let dir = [10, 1];
  for (let line of input) {
    let [, action, value] = line.match(/(\w)(\d+)/);
    value = +value;
    switch (action) {
      case 'N':
        dir = [dir[0], dir[1] + value];
        break;
      case 'S':
        dir = [dir[0], dir[1] - value];
        break;
      case 'E':
        dir = [dir[0] + value, dir[1]];
        break;
      case 'W':
        dir = [dir[0] - value, dir[1]];
        break;
      case 'L':
        dir = rotateBy(dir, -value);
        break;
      case 'R':
        dir = rotateBy(dir, value);
        break;
      case 'F':
        pos = [pos[0] + value * dir[0], pos[1] + value * dir[1]];
        break;
    }
  }
  console.log(pos.reduce((sum, n) => sum + Math.abs(n), 0));
}

let inputs = fs.readFileSync("./actions.txt", "utf8").trim();

inputs = inputs.split('\n');

solve1(inputs);
solve2(inputs);