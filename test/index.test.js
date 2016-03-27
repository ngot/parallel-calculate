const Calculate = require('../');
const test = require('test');
const coroutine = require('coroutine');
const path = require('path');

test.setup();

describe('cal', () => {
  it('shoud cal odd number data ok', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'),
      2);
    let arrs = [];
    let total = 7;
    for (let i = 0; i < total; i++) {
      arrs.push(i);
    }
    arrs = cal.proxy(arrs, 'plus');
    assert.equal(arrs.slice(-1), total);
  });

  it('shoud cal data less than threads ok', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'), 16);
    let arrs = [];
    let total = 3;
    for (let i = 0; i < total; i++) {
      arrs.push(i);
    }
    arrs = cal.proxy(arrs, 'plus');
    assert.equal(arrs.slice(-1), total);
  });

  it('shoud cal even number data ok', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'),
      2);
    let arrs = [];
    let total = 4;
    for (let i = 0; i < total; i++) {
      arrs.push(i);
    }
    arrs = cal.proxy(arrs, 'plus');
    assert.equal(arrs.slice(-1), total);
  });

  it('shoud throw when init without path', () => {
    assert.throws(() => new Calculate());
  });

  it('shoud throw when invoke proxy without datas or method', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'),
      1);
    assert.throws(() => cal.proxy());
    assert.throws(() => cal.proxy([1, 2]));
  });

  it('shoud throw when invoke proxy with not exist method', () => {
    let cal = new Calculate(path.join(__dirname, 'support', 'worker.js'),
      1);
    assert.throws(() => cal.proxy([1, 2], 'notExist'));
  });
});

test.run(console.DEBUG);
