import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function isCharacterInt(char: string): boolean {
  return !isNaN(parseInt(char));
}

function parseLine(line: string) {
  let firstInt: number | undefined;
  let lastInt: number | undefined;
  let i = 0;
  let j = line.length - 1;
  while (firstInt === undefined) {
    if (isCharacterInt(line[i])) {
      firstInt = parseInt(line[i]);
    } else {
      i++;
    }
  }
  while (lastInt === undefined) {
    if (isCharacterInt(line[j])) {
      lastInt = parseInt(line[j]);
    } else {
      j--;
    }
  }
  return parseInt(`${firstInt}${lastInt}`);
}

const sum = lines.map(parseLine).reduce((sum, next) => sum + next, 0);

console.log(sum);
