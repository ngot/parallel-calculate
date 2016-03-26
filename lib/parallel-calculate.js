const rpc = require('rpc');
const assert = require('assert');
const coroutine = require('coroutine');
const os = require('os');

const _path = Symbol('Calculate#path');
const _limits = Symbol('Calculate#limits');
const _tasks = Symbol('Calculate#tasks');

class Calculate {
  constructor(path, limits) {
    assert.ok(!!path, 'path must be exist!');

    this[_path] = path;
    this[_limits] = limits || os.CPUs();

    this[_tasks] = [];
    for (let index = 0; index < this[_limits]; index++) {
      this[_tasks].push(rpc.open(path));
    }
  }

  proxy(datas, method) {
    assert.ok(!!datas, 'datas must be exist!');

    let perLen = parseInt(datas.length / this[_limits], 10);
    let toCalDatas = [];

    for (let i = 0; i < this[_limits]; i++) {
      let toCal = datas.slice(i * perLen, (i + 1) * perLen);
      if (!toCal || !toCal.length) {
        break;
      }
      toCalDatas.push({
        datas: toCal,
        index: i
      });
    }

    toCalDatas = coroutine.parallel(toCalDatas, toCalData => this[_tasks][
      toCalData.index
    ][method](toCalData.datas), toCalDatas.length);

    return toCalDatas.reduce((pre, current) => pre.concat(current));
  }
}

module.exports = Calculate;
