import child_process from "child_process";
import os from "os";

const numProcesses = os.cpus().length;

let done = 0;
let min = Infinity;
for (var i = 0; i < numProcesses; i++) {
  const child = child_process.fork("days/5/worker.js");
  child.send(i);
  child.on("message", function (message) {
    console.log("[parent] received message from child:", message.toString());
    min = Math.min(min, parseInt(message.toString()));
    done++;
    if (done === numProcesses) {
      console.log("[parent] received all results");
      console.log("[parent] min:", min);
    }
  });
}
