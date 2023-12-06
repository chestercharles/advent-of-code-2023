import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8");

const lines = input.split("\n");
const [time, dist] = lines.map((line) =>
  line
    .split(":")[1]
    .trim()
    .split("  ")
    .map((char) => parseInt(char.trim()))
    .filter((n) => !isNaN(n))
);

// d = (t - n)*n
function calcDist(n: number, t: number) {
  return (t - n) * n;
}

let chance = 1;

for (let ri = 0; ri < time.length; ri++) {
  let paths = 0;
  const t = time[ri];
  const record = dist[ri];
  for (let n = 0; n <= t; n++) {
    const d = calcDist(n, t);

    if (d > record) {
      paths++;
    }
  }

  chance = chance * paths;
}

console.log(chance);
