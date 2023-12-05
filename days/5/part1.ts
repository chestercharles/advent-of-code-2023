import { readFileSync } from "fs";
import { join } from "path";

function createMapper(map: number[][]) {
  return (input: number) => {
    for (const [dstStart, srcStart, rngLen] of map) {
      if (rngLen === 0) {
        continue;
      }
      if (input >= srcStart && input <= srcStart + rngLen - 1) {
        return dstStart + (input - srcStart);
      }
    }
    return input;
  };
}

const input = readFileSync(join(__dirname, "input.txt"), "utf8");
const groups = input.split("\n\n");
const [seedStr, ...mapStrs] = groups;
const seeds = seedStr.split(":")[1].trim().split(" ").map(Number);

const mappers = mapStrs
  .map((str) => str.split(":")[1].trim())
  .map((str) => {
    const matrix = str
      .split("\n")
      .map((numList) => numList.trim().split(" ").map(Number));
    return createMapper(matrix);
  });

const lowest = seeds
  .map((seed) => {
    let result = seed;
    for (const mapper of mappers) {
      result = mapper(result);
    }
    return result;
  })
  .reduce((lowest, next) => {
    return Math.min(lowest, next);
  });

console.log(lowest);
