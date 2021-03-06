const rpc = require('rpc');
const assert = require('assert');
const coroutine = require('coroutine');
const os = require('os');

const _path = Symbol('Calculate#path');
const _limits = Symbol('Calculate#limits');
const _task = Symbol('Calculate#task');

class Calculate {
  /**
   * constructor
   *
   * @param {String} path to the worker file,must be absolute path.
   * @param {Number} optinal. Concurrency number.
   */
  constructor(path, limits) {
    assert.ok(!!path, 'path must be exist!');

    this[_path] = path;
    this[_limits] = limits || os.CPUs();
    this[_task] = rpc.open(path);
  }

  /**
   * worker invoke
   *
   * @param {Array} datas to cal.must Array.
   * @param {String} method want to invoke.
   * @returns {Array} Returns the result processed by the method.
   */
  proxy(datas, method) {
    assert.ok(!!datas, 'datas must be exist!');
    assert.ok(!!method, 'method must be exist!');
    let perLen = Math.round(datas.length / this[_limits]);
    let toCalDatas = [];

    if (perLen < 1) {
      toCalDatas.push(datas);
    } else {
      for (let i = 0; i < this[_limits]; i++) {
        let arr = datas.slice(i * perLen, (i + 1) * perLen);
        if (arr && arr.length) {
          toCalDatas.push(arr);
        }
      }
    }

    toCalDatas = coroutine.parallel(toCalDatas, toCalData => this[_task][method](toCalData), this[_limits]);

    return toCalDatas.reduce((pre, current) => pre.concat(current));
  }
}

module.exports = Calculate;
