import { readFileSync } from "fs";

function createMapper(map) {
  return (input) => {
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

const input = readFileSync("days/5/input.txt", "utf8");
const groups = input.split("\n\n");
const [seedStr, ...mapStrs] = groups;
const seedRangRaw = seedStr.split(":")[1].trim().split(" ").map(Number);

const seedRanges = [];
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

function Mapper() {
  return (input) => {
    let result = input;
    for (const mapper of mappers) {
      result = mapper(result);
    }
    return result;
  };
}

function Logger(n) {
  return {
    log: (input) => {
      console.log(`[child ${n}] ${input}`);
    },
  };
}

process.on("message", function (message) {
  const n = parseInt(message);
  const logger = Logger(n);
  logger.log(`actviated with n=${n}`);
  const mapper = Mapper();
  let min = Infinity;
  const rng = seedRanges[n];
  const start = rng[0];
  const len = rng[1] - 1;

  for (let i = start; i < start + len; i++) {
    const result = mapper(i);
    min = Math.min(min, result);
    if (i % 10000000 === 0) {
      const pctComplete = (100 * ((i - start) / len)).toFixed(2);
      logger.log(pctComplete + "% complete");
    }
  }

  process.send(min);
  logger.log("disconnecting");
  process.disconnect && process.disconnect();
});
