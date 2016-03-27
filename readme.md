# parallel-calculate
 Yeah! That's right. MutiThread JS for fast calculation.

# Benchmark
![](./benchmark/imgs/bench.png)

# Usage
```js
const Calculator = require('parallel-calculate');
const calculator = new Calculator(path.join(__dirname, './test/support/worker.js'));
let result = calculator.proxy([1,2,3], 'plus');
```

# APIs

parallel-calculate

### constructor(path, limits);
 - path: @param {String} path to the worker file,must be absolute path.
 - limits: @param {Number} optinal. Concurrency number.

### proxy(datas, method)
- datas: @param {Array} datas to cal.must Array.
- method: @param {String} method want to invoke.
- @returns {Array} Returns the result processed by the method.

# test

```
fibjs test/index.test.js
```

# Attendtion
- You can only use this lib on [fibjs](https://github.com/xicilion/fibjs).It does not support Node.js.
