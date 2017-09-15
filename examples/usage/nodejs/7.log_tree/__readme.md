
## The Tas Log Tree

Tas can automatically print the names of all tasks. Because these tasks are hierarchies, and the hierarchy is displayed as indentation, so a tree structure is formed. Like below:

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.gif)

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

### How To Use

#### Print log tree in all modules

Just load Tas tree only once in main js file. This will makes Tas in all modules loading tree automatically, and we do not have to do it repeatedly in other modules. like below:
```js
var tas = require('tas').load('tree');
```

See examples/demo/easy-asynchronization/index.js

　

#### Print log tree in a module

1. If you need to print log tree in all modules, See:

2. ​
3. See examples/usage/nodejs/7.log_tree/tree.js

Run the following tests one by one to experience it:

```bash
$ cd /path/to/tas
$ cd test
$ mocha mocha/5.break_the_flow/return_abort.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.await.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.promise.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.forEach.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.all.test.js
$ mocha mocha/5.break_the_flow/abort_in_tas.race.test.js
```

