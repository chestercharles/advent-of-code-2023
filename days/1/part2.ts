import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function isInt(char: string): boolean {
  return !isNaN(parseInt(char));
}

function getFirstInt(line: string) {
  for (let i = 0; i < line.length; i++) {
    if (isInt(line[i])) {
      return parseInt(line[i]);
    }

    for (let j = 0; j < numbers.length; j++) {
      const num = numbers[j];
      if (num.length > line.length - i) {
        continue;
      }
      if (num === line.slice(i, i + num.length)) {
        return j + 1;
      }
    }
  }
}

function getLastInt(line: string) {
  for (let i = line.length - 1; i >= 0; i--) {
    if (isInt(line[i])) {
      return parseInt(line[i]);
    }

    for (let j = 0; j < numbers.length; j++) {
      const num = numbers[j];
      if (num.length > line.length - i) {
        continue;
      }
      if (num === line.slice(i, i + num.length)) {
        return j + 1;
      }
    }
  }
}

function parseLine(line: string) {
  let first = getFirstInt(line);
  let last = getLastInt(line);
  return parseInt(`${first}${last}`);
}

const result = lines.map(parseLine).reduce((sum, next) => sum + next, 0);

console.log(result);
