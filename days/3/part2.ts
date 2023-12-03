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

function getNearbySymbolCoords(lines: string[], i: number, j: number) {
  const left = lines[i][j - 1];
  const right = lines[i][j + 1];
  const above = lines[i - 1]?.[j];
  const below = lines[i + 1]?.[j];
  const aboveLeft = lines[i - 1]?.[j - 1];
  const aboveRight = lines[i - 1]?.[j + 1];
  const belowLeft = lines[i + 1]?.[j - 1];
  const belowRight = lines[i + 1]?.[j + 1];

  const result: number[][] = [];

  if (isSymbol(left)) {
    result.push([i, j - 1]);
  }
  if (isSymbol(right)) {
    result.push([i, j + 1]);
  }
  if (isSymbol(above)) {
    result.push([i - 1, j]);
  }
  if (isSymbol(below)) {
    result.push([i + 1, j]);
  }
  if (isSymbol(aboveLeft)) {
    result.push([i - 1, j - 1]);
  }
  if (isSymbol(aboveRight)) {
    result.push([i - 1, j + 1]);
  }
  if (isSymbol(belowLeft)) {
    result.push([i + 1, j - 1]);
  }
  if (isSymbol(belowRight)) {
    result.push([i + 1, j + 1]);
  }
  return result.map((coord) => `${coord[0]},${coord[1]}`);
}

let nums: number[] = [];

let symbols = new Map<string, number[]>();

for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  const line = lines[lineNum];
  for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
    let intString = "";
    let symbolCoords = new Set<string>();
    while (isInt(line[lineIndex]) && lineIndex < line.length) {
      getNearbySymbolCoords(lines, lineNum, lineIndex).forEach((coord) =>
        symbolCoords.add(coord)
      );
      intString += line[lineIndex];
      lineIndex++;
    }

    symbolCoords.forEach((coord) => {
      const adjacentNums = symbols.get(coord) || [];
      adjacentNums.push(parseInt(intString));
      symbols.set(coord, adjacentNums);
    });
  }
}

let sum = 0;

symbols.forEach((adjacentNums) => {
  if (adjacentNums.length == 2) {
    sum += adjacentNums[0] * adjacentNums[1];
  }
});

console.log(sum);

// console.log(nums.reduce((sum, next) => sum + next, 0));
