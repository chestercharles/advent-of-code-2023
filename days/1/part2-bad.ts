import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

const ns = [
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

function isCharacterInt(char: string): boolean {
  return !isNaN(parseInt(char));
}

function getFirstIndexOfWordNumber(line: string) {
  let index: number = Infinity;
  let theInt: number | undefined;
  ns.forEach((wn, wni) => {
    if (line.indexOf(wn) !== -1) {
      let newI = Math.min(index, line.indexOf(wn));
      if (newI !== -1 && newI !== index) {
        index = newI;
        theInt = wni + 1;
      }
    }
  });
  if (index === Infinity) {
    index = -1;
  }
  return [index, theInt] as const;
}

function getLastIndexOfWordNumber(line: string) {
  let index: number = -1;
  let theInt: number | undefined;
  ns.forEach((wn, wni) => {
    if (line.lastIndexOf(wn) !== -1) {
      let newI = Math.max(index, line.indexOf(wn));
      if (newI !== -1 && newI !== index) {
        index = newI;
        theInt = wni + 1;
      }
    }
  });
  if (index === Infinity || index === -1) {
    index = -1;
  }
  return [index, theInt] as const;
}

function getFirstIndexOfNumber(line: string) {
  let index: number | undefined;
  let theInt: number | undefined;
  line.split("").forEach((char, i) => {
    if (index !== undefined) {
      return;
    }
    if (isCharacterInt(char)) {
      index = i;
      theInt = parseInt(char);
    }
  });
  return [index ?? -1, theInt] as const;
}

function getLastIndexOfNumber(line: string) {
  let index: number | undefined;
  let theInt: number | undefined;
  line
    .split("")
    .reverse()
    .forEach((char, i) => {
      if (index !== undefined) {
        return;
      }
      if (isCharacterInt(char)) {
        index = line.length - i;
        theInt = parseInt(char);
      }
    });
  return [index ?? -1, theInt] as const;
}

function parseLine(line: string) {
  const fw = getFirstIndexOfWordNumber(line);
  const lw = getLastIndexOfWordNumber(line);
  const fn = getFirstIndexOfNumber(line);
  const ln = getLastIndexOfNumber(line);

  let firstInt: number;
  if (fw[0] !== -1 && (fw[0] <= fn[0] || fn[0] === -1)) {
    firstInt = fw[1] as number;
  } else {
    firstInt = fn[1] as number;
  }

  let lastInt: number;
  if (lw[0] !== -1 && (lw[0] >= ln[0] || ln[0] === -1)) {
    lastInt = lw[1] as number;
  } else {
    lastInt = ln[1] as number;
  }

  return parseInt(`${firstInt}${lastInt}`);
}

const sum = lines.map(parseLine).reduce((sum, next) => sum + next, 0);

console.log(sum);
