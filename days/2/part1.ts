import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");

function getNumberFromString(str: string) {
  return parseInt(str.replace(/\D/g, ""));
}

function getGameNumberIfValidOrZero(line: string) {
  const [gameNumberStr, roundsStr] = line.split(":");
  const gameNumber = getNumberFromString(gameNumberStr);
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

  if (maxes["red"] > 12) {
    return 0;
  }

  if (maxes["green"] > 13) {
    return 0;
  }

  if (maxes["blue"] > 14) {
    return 0;
  }

  return gameNumber;
}

const result = lines
  .map(getGameNumberIfValidOrZero)
  .reduce((sum, next) => sum + next, 0);

console.log(result);
