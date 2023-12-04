import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function getCardWins(cards: string[], cardIndex: number) {
  const [, nums] = cards[cardIndex].split(":");
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
  const numWins = hasNums.filter((n) => winningNums.includes(n)).length;
  if (numWins === 0) {
    return 1;
  }

  let sum = 1;
  for (let i = 0; i < numWins; i++) {
    sum += getCardWins(cards, cardIndex + 1 + i);
  }
  return sum;
}

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  sum += getCardWins(lines, i);
}

console.log(sum);
