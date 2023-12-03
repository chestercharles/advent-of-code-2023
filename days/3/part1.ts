import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function isPeriod(char: string | undefined): boolean {
  return char === ".";
}

function isInt(char: string | undefined): boolean {
  if (char === undefined) {
    return false;
  }
  return !isNaN(parseInt(char));
}

function isSymbol(char: string | undefined): boolean {
  return !isInt(char) && !isPeriod(char) && !!char;
}

function hasSymbolsNearby(lines: string[], i: number, j: number): boolean {
  const left = lines[i][j - 1];
  const right = lines[i][j + 1];
  const above = lines[i - 1]?.[j];
  const below = lines[i + 1]?.[j];
  const aboveLeft = lines[i - 1]?.[j - 1];
  const aboveRight = lines[i - 1]?.[j + 1];
  const belowLeft = lines[i + 1]?.[j - 1];
  const belowRight = lines[i + 1]?.[j + 1];

  return (
    isSymbol(left) ||
    isSymbol(right) ||
    isSymbol(above) ||
    isSymbol(below) ||
    isSymbol(aboveLeft) ||
    isSymbol(aboveRight) ||
    isSymbol(belowLeft) ||
    isSymbol(belowRight)
  );
}

let nums: number[] = [];

for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  const line = lines[lineNum];

  for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
    let intString = "";
    let itCounts = false;
    while (isInt(line[lineIndex]) && lineIndex < line.length) {
      if (hasSymbolsNearby(lines, lineNum, lineIndex)) {
        itCounts = true;
      }
      intString += line[lineIndex];
      lineIndex++;
    }

    if (itCounts) {
      nums.push(parseInt(intString));
    }
  }
}

console.log(nums.reduce((sum, next) => sum + next, 0));
