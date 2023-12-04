import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function parseLine(line: string) {
  const [, nums] = line.split(":");
  const [_winningNums, _hasNums] = nums.split("|");
  const hasNums = _hasNums
    .trim()
    .split("  ")
    .join(" ")
    .split(" ")
    .map((n) => n.trim());
  const winningNums = _winningNums
    .trim()
    .split("  ")
    .join(" ")
    .split(" ")
    .map((n) => n.trim());
  const sum = hasNums.reduce((_sum, n) => {
    const itWins = winningNums.includes(n);
    if (itWins) {
      if (_sum === 0) {
        _sum = 1;
      } else {
        _sum = _sum * 2;
      }
    }
    return _sum;
  }, 0);
  return sum;
}

const sum = lines.map(parseLine).reduce((sum, next) => sum + next, 0);
console.log(sum);
