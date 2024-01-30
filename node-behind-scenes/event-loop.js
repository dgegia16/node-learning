const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

fs.readFile("test-file.txt", "utf8", function () {
  // 2
  console.log("i/o finished");
  //   1
  setTimeout(() => {
    console.log("Timer 2 expired");
  }, 0);
  //   4
  setTimeout(() => {
    console.log("Timer 3 expired");
  }, 3000);
  //   3
  setImmediate(() => {
    console.log("Immediate 2");
  });
  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});
// first
console.log("Hello from the top level");
