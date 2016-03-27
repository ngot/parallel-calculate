const Calculate = require('../');
const path = require('path');
const os = require('os');

const workPath = path.join(__dirname, '../test/support/worker.js');

let oneThread = new Calculate(workPath, 1);
let mutiThread = new Calculate(workPath, 16);

// large data to cal
let arrs = [];
for (let i = 0; i < 5000000; i++) {
  arrs.push(i);
}

console.notice(`cal start with 16 fibers ...`);
console.time('mutiThread');
mutiThread.proxy(arrs, 'plus')
console.timeEnd('mutiThread');

console.notice(`cal start with 1 fibers ...`);
console.time('oneThread');
oneThread.proxy(arrs, 'plus')
console.timeEnd('oneThread');
