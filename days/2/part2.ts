import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function getGameNumberIfValidOrZero(line: string) {
  const [, roundsStr] = line.split(":");
  let maxes = {
    green: 0,
    red: 0,
    blue: 0,
  };
  const rounds = roundsStr.split(";");
  rounds.forEach((round) => {
    round
      .trim()
      .split(",")
      .forEach((colorPull) => {
        const [num, color] = colorPull.trim().split(" ");
        maxes[color] = Math.max(maxes[color], parseInt(num));
      });
  });

  return maxes["red"] * maxes["green"] * maxes["blue"];
}

const result = lines
  .map(getGameNumberIfValidOrZero)
  .reduce((sum, next) => sum + next, 0);

console.log(result);
