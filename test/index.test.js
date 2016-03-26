const Calculate = require('../');
const test = require('test');
const coroutine = require('coroutine');
const path = require('path');

test.setup()

describe('cal', () => {
  it('do', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'));
    let arrs = [];
    for (let i = 0; i < 20; i++) {
      arrs.push(i);
    }

    console.time('F');
    coroutine.parallel([1,2,3,4], (i)=>{
      console.time(i);
      let res = cal.proxy(arrs, 'plus')
      console.timeEnd(i);
    })
    console.timeEnd('F');
    assert.equal()
  });
});

test.run(console.DEBUG);
