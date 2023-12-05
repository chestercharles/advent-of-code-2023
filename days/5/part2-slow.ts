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

const input = readFileSync(join(__dirname, "input-test.txt"), "utf8");
const groups = input.split("\n\n");
const [seedStr, ...mapStrs] = groups;
const seedRangRaw = seedStr.split(":")[1].trim().split(" ").map(Number);

const seedRanges: number[][] = [];
for (let i = 0; i < seedRangRaw.length; i += 2) {
  const start = seedRangRaw[i];
  const rngLen = seedRangRaw[i + 1] - 1;
  seedRanges.push([start, rngLen]);
}

const mappers = mapStrs
  .map((str) => str.split(":")[1].trim())
  .map((str) => {
    const matrix = str
      .split("\n")
      .map((numList) => numList.trim().split(" ").map(Number));
    return createMapper(matrix);
  });

function MemoMapper() {
  const cache = new Map<number, number>();
  return (input: number) => {
    if (cache.has(input)) {
      return cache.get(input)!;
    }
    let result = input;
    for (const mapper of mappers) {
      result = mapper(result);
    }
    cache.set(input, result);
    return result;
  };
}

const mapper = MemoMapper();
let min = Infinity;
for (const rng of seedRanges) {
  console.log("Starting range", rng[0]);
  const start = rng[0];
  const len = rng[1];
  let tick = Date.now();
  for (let i = start; i < start + len - 1; i++) {
    const result = mapper(i);
    min = Math.min(min, result);
    // log every 1000
    if (i % 10000 === 0) {
      const tock = Date.now();
      console.log("Took", tock - tick, "ms");
      tick = Date.now();
      console.log("Current min", min);
    }
  }
}

console.log(min);
