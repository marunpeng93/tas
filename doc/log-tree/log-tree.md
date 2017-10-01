
## The Tas Log Tree

Tas can prints the task name with indent, and the logs in tasks is printed with the indent of tasks, so a tree structure is formed. Like below:

![](https://raw.githubusercontent.com/tasjs/tas/master/examples/demo/__res/easy-asynchronization.gif)

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

#### Print log tree in all modules

Just enable Tas tree only once in main js file. This will makes Tas in all modules printing log tree automatically. Like below:
```js
var tas = require('tas');
var log = tas.tree.log;

// Enable printing log tree
tas.enableTree();
```

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/demo/easy-asynchronization/index.js
```

　

#### Print log tree in a module

Sometimes we only need to print the Tas tree in a module, so we should enable log tree in the following way, and then disable log tree at the end of the module to avoid affect the other modules. For example ( the below code is copied from [examples/usage/nodejs/7.log_tree/tree.js](../../examples/usage/nodejs/7.log_tree/tree.js)): 

```js
var tas = require('tas');
var log = tas.tree.log;

tas(function(){
  
    // Enable printing log tree in this module.
    tas.enableTree();
});

...

tas(function(){

    // Disable printing log tree to avoid affect the other modules.
    tas.disableTree();
});
```

Run the following to experience it:

```bash
$ cd /path/to/tas
$ node examples/usage/nodejs/7.log_tree/tree.js       # print log tree
$ node examples/usage/nodejs/index.js                 # no log tree be printed
```

