
## The Tas Log Tree

Tas can automatically print the names of all tasks, and the logs in tasks is printed with the indent of tasks. Because these tasks are hierarchies, and the hierarchy is displayed as indentation, so a tree structure is formed. Like below:

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.gif)

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

### How To Use

#### Print log tree in all modules

Just load Tas tree only once in main js file. This will makes Tas in all modules loading tree automatically, and we do not have to do it repeatedly in other modules. Like below:
```js
var tas = require('tas').load('tree');
var log = tas.tree.log;
```

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

#### Print log tree in a module

Sometimes we only need to print the Tas tree in a module, so we should load the Tas tree in the following way, and then unload it at the end of the module to avoid affect the other modules. 

For example, the below code is copied from examples/usage/nodejs/7.log_tree/tree.js: 

```js
tas(function(){
    tas.load('tree');
    
    // If we run test.js independently, it will print logs in tree structure.
    // But if it's run in ../index.js, it will not do that.
    // Because the global.isDisabledLog is set as true in ../index.js,
    // and this will lead tas.tree.log() to ignore printing logs.
    log = tas.tree.log;
});

...

tas(function(){

    // Unload Tas tree to avoid affect the other modules.
    tas.unload('tree');
});
```

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/usage/nodejs/7.log_tree/tree.js       # print log tree
$ node examples/usage/nodejs/index.js                 # no log tree be printed
```

