import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "calibration.txt"), "utf8");

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

let gearPossibilities: Record<string, number[]> = {};

for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  const line = lines[lineNum];

  for (let lineIndex = 0; lineIndex < line.length; lineIndex++) {
    if (isSymbol(line[lineIndex])) {
      const key = `${lineNum},${lineIndex}`;
      const possibilities = gearPossibilities[key] || [];
      // get left numbs
      let leftIntString = "";
      let _lineIndex = lineIndex;
      while (isInt(line[lineIndex - 1]) && _lineIndex > 0) {
        leftIntString = line[_lineIndex - 1] + leftIntString;
        _lineIndex--;
      }
      if (leftIntString.length > 0) {
        possibilities.push(parseInt(leftIntString));
      }
      // get right nums
      let rightIntString = "";
      _lineIndex = lineIndex;
      while (isInt(line[lineIndex + 1]) && _lineIndex < line.length) {
        rightIntString += line[_lineIndex + 1];
        _lineIndex++;
      }
      if (rightIntString.length > 0) {
        possibilities.push(parseInt(rightIntString));
      }
      // get above left nums
      let aboveLeftIntString = "";
      _lineIndex = lineIndex;
      while (isInt(lines[lineNum - 1]?.[_lineIndex - 1]) && _lineIndex > 0) {
        aboveLeftIntString =
          lines[lineNum - 1]?.[_lineIndex - 1] + aboveLeftIntString;
        _lineIndex--;
      }
      // check for int directly above
      let wasAbove = false;
      if (isInt(lines[lineNum - 1]?.[lineIndex])) {
        aboveLeftIntString =
          lines[lineNum - 1]?.[lineIndex] + aboveLeftIntString;
        wasAbove = true;
      }
      if (wasAbove) {
        // check for more ints above right
        _lineIndex = lineIndex;
        while (
          isInt(lines[lineNum - 1]?.[_lineIndex + 1]) &&
          _lineIndex < line.length
        ) {
          aboveLeftIntString += lines[lineNum - 1]?.[_lineIndex + 1];
          _lineIndex++;
        }
      }
      if (aboveLeftIntString.length > 0) {
        possibilities.push(parseInt(aboveLeftIntString));
      }
      if (!wasAbove) {
        // get above right nums
        let aboveRightIntString = "";
        _lineIndex = lineIndex;
        while (
          isInt(lines[lineNum - 1]?.[_lineIndex + 1]) &&
          _lineIndex < line.length
        ) {
          aboveRightIntString += lines[lineNum - 1]?.[_lineIndex + 1];
          _lineIndex++;
        }
        if (aboveRightIntString.length > 0) {
          possibilities.push(parseInt(aboveRightIntString));
        }
      }
      // get below left nums
      let belowLeftIntString = "";
      _lineIndex = lineIndex;
      while (isInt(lines[lineNum + 1]?.[_lineIndex - 1]) && _lineIndex > 0) {
        belowLeftIntString =
          lines[lineNum + 1]?.[_lineIndex - 1] + belowLeftIntString;
        _lineIndex--;
      }
      // check for int directly below
      let wasBelow = false;
      if (isInt(lines[lineNum + 1]?.[lineIndex])) {
        belowLeftIntString =
          lines[lineNum + 1]?.[lineIndex] + belowLeftIntString;
        wasBelow = true;
      }
      if (wasBelow) {
        // check for more ints below right
        _lineIndex = lineIndex;
        while (
          isInt(lines[lineNum + 1]?.[_lineIndex + 1]) &&
          _lineIndex < line.length
        ) {
          belowLeftIntString += lines[lineNum + 1]?.[_lineIndex + 1];
          _lineIndex++;
        }
      }
      if (belowLeftIntString.length > 0) {
        possibilities.push(parseInt(belowLeftIntString));
      }
      if (!wasBelow) {
        // get below right nums
        let belowRightIntString = "";
        _lineIndex = lineIndex;
        while (
          isInt(lines[lineNum + 1]?.[_lineIndex + 1]) &&
          _lineIndex < line.length
        ) {
          belowRightIntString += lines[lineNum + 1]?.[_lineIndex + 1];
          _lineIndex++;
        }
        if (belowRightIntString.length > 0) {
          possibilities.push(parseInt(belowRightIntString));
        }
      }
      gearPossibilities[key] = possibilities;
    }
  }
}

console.log(gearPossibilities);

let sum = 0;
for (const possibility in gearPossibilities) {
  const nums = gearPossibilities[possibility];
  if (nums.length === 2) {
    sum += nums[0] * nums[1];
  }
}

console.log(sum);
