(function(r,f){if(typeof define==='function'&&define.amd){define(function(){return f(r,r.document)})}else if(typeof exports==='object'){module.exports=r.document?f(r,r.document):function(w){return f(w,w.document)}}else{r.tas=f(r,r.document)}}(typeof window!=='undefined'?window:this,function(window,document){return (function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};

	// The require function
	function __webpack_require__(moduleId) {

		// Check if module is in cache
		if(installedModules[moduleId])
			return installedModules[moduleId].exports;

		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: false
		};

		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		// Flag the module as loaded
		module.loaded = true;

		// Return the exports of the module
		return module.exports;
	}

	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// __webpack_public_path__
	__webpack_require__.p = "";

	// Load entry module and return exports
	return __webpack_require__(0);
})

/*----------------------------------------------------------------------*/
/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */
/*----------------------------------------------------------------------*/

([

function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(2),
		__webpack_require__(31),
		__webpack_require__(8),
		__webpack_require__(21)
	)})

	(function(app, util, layer, maxLayer){

		var basic = {

			// Break the current tasks.
			break: function(err){
				app.break(err);
			},

			// Break Tas from nested function (closures).
			abort: function(err){
				app.abort(err);
			},

			done: function(){
				app.done();
			}
		};

		var async = {
			await: function(){
				app.await([].slice.call(arguments));
			},

			next: function(){
				app.next([].slice.call(arguments));
			}
		};

		var promise = {
			promise: function(){
				app.promise([].slice.call(arguments));
			},

			all: function(){
				app.all([].slice.call(arguments));
			},

			race: function(){
				app.race([].slice.call(arguments));
			},

			cancel: function(args){
				app.cancel(args);
			}
		};

		var array = {
			forEach: function(){
				app.forEach([].slice.call(arguments));
			},

			continue: function(){
				app.continue();
			}
		};

		// For debugging
		Object.defineProperty(app.entry, 'layer', {
			get: function(){
				return layer.get();
			}
		});

		Object.defineProperty(app.entry, 'maxLayer', {
			get: function(){
				return maxLayer.get() + 1;
			}
		});

		module.exports = util.object.extend(app.entry, basic, async, promise, array);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(3),
		__webpack_require__(35),
		__webpack_require__(38),
		__webpack_require__(42),
		__webpack_require__(31)
	)})

	(function(core, async, promise, array, util){

		var tas = {
			entry: function(){
				tas.do([].slice.call(arguments));
			},

			do: function(args){
				core.do(args);
			},

			break: function(err){
				core.break(err);
			},

			abort: function(err){
				core.abort(err);
			},

			done: function(){
				core.done();
			}
		};

		var asy = {
			await: function(args){
				async.await(args);
			},

			next: function(args){
				async.next(args);
			}
		};

		var pro = {
			promise: function(args){
				promise.convert(args, "promise");
			},

			all: function(args){
				promise.convert(args, "all");
			},

			race: function(args){
				promise.convert(args, "race");
			},

			cancel: function(args){
				promise.cancel(args);
			}
		};

		var arr = {
			forEach: function(args){
				array.forEach(args);
			},

			continue: function(){
				array.continue();
			}
		};

		module.exports = util.object.extend(tas, asy, pro, arr);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(4)
	)})

	(function(tasks){

		var core = {
			do: function(args){
				tasks.do(args);
			},

			break: function(err){
				tasks.break(err);
			},

			abort: function(err){
				tasks.abort(err);
			},

			done: function(){
				tasks.done();
			}
		};

		module.exports = (core);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(5),
		__webpack_require__(10),
		__webpack_require__(22),
		__webpack_require__(34)
	)})

	(function(data, units, global, forEach){

		var tas = {
			do: function(args){
				data.add(args);
				global.isDone.set(false);
				!global.isAbort.get() && tas.exec();
			},

			exec: function(){
				var tasks = data.getNextTasks();
				if (tasks.forEach === true) {
					forEach.do(tas, tasks);
				}
				else {
					units.do(tas, tasks);
				}
			},

			break: function(err){
				err && /* istanbul ignore next */ console.log(err);
				units.break();
			},

			abort: function(err){
				err && /* istanbul ignore next */ console.log(err);
				global.isAbort.set();
			},

			done: function(){
				global.reset();
				data.clear();
				units.clear();
				global.isDone.set();
			},

			getNextTasks: function(layer){
				return data.getNextTasks(layer);
			},

			fixLayer: function(tasks) {
				data.fixLayer(tasks);
			}
		};

		module.exports = (tas);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(6),
		__webpack_require__(8),
		__webpack_require__(9)
	)})

	(function(id, layer, sequence){

		var objects = {

			add: function(args){
				var describe;
				var obj;

				({
				saveDescribe: function(){
					typeof args[0] === 'string' && (describe = args.shift());
					typeof args[0] === 'object' && (obj = args[0]);
					return this;
				},

				packLog: function(){
					/* istanbul ignore next */
					if (args.length === 0) {
						var log = describe;
						args[0] = function(){console.log(log)};
						describe = "";
					}
					return this;
				},

				packFunctions: function(){
					if (args[0] instanceof Function) {
						obj = {};
						args.forEach(function(func, index){
							obj['t' + (index + 1)] = func;
						});
					}
					return this;
				},

				saveTasks: function(){
					obj.name = describe ? describe : 'Tasks[' + id.add() + ']';
					sequence.saveTasks(obj);
					return this;
				}

				}).saveDescribe().packLog().packFunctions().saveTasks();
			},

			clear: function(){
				id.clear();
				sequence.clear();
			},

			getNextTasks: function(layer){
				return sequence.getNextTasks(layer);
			},

			fixLayer: function(tasks) {
				/* istanbul ignore next */
				if (typeof tasks.layer === 'undefined') {
					tasks.layer = layer.get();
				}
			}
		};

		module.exports = (objects);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(7)
	)})

	(function(number){

		var id = Object.create(number);
		module.exports = (id);
	});
},

function(module, exports) {

	(function(){

		var number = {
			value: 0,
			
			get: function(){
				return this.value;
			},

			add: function(){
				this.value ++;
				return this.value;
			},

			sub: function(){
				this.value --;
				return this.value;
			},

			set: function(val){
				this.value = val;
			},

			save: function(val){
				this.set(val);
			},

			clear: function(){
				this.value = 0;
			},

			reset: function(){
				this.clear();
			}
		};

		module.exports = (number);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(7)
	)})

	(function(number){

		var layer = Object.create(number);
		module.exports = (layer);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(8)
	)})

	(function(layer){
		
		var sequence = {
			data: {},
			
			saveTasks: function(obj){
				var lay = layer.get();
				obj.layer = lay;

				typeof this.data[lay] === 'undefined' && (this.data[lay] = []);
				this.data[lay].push(obj);
			},

			getNextTasks: function(lay){
				var arr = this.data[lay || layer.get()];
				return arr ? arr.shift() : /* istanbul ignore next */ null;
			},

			clear: function(){
				this.data = {};
				layer.clear();
			}
		};

		module.exports = (sequence);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(11),
		__webpack_require__(12),
		__webpack_require__(27),
		__webpack_require__(17)
	)})

	(function(data, run, exec, status){

		var units = {
			tas: {},

			do: function(tas, tasks){
				units.tas = tas;

				tas.fixLayer(tasks);
				data.add(tasks);
				units.exec(tasks.layer);
			},

			exec: function(layer){
				exec.do(units, layer);
			},

			run: function(func){
				return run.do(func);
			},

			break: function(){
				status.isBreak.set();
			},

			clear: function(){
				data.clear();
			}
		};

		module.exports = (units);
	});
},

function(module, exports) {

	(function(){

		var functions = {};

		var data = {
			add: function(obj){
				var layer = obj.layer;

				({
				initThisLayer: function(){
					typeof functions[layer] === 'undefined' && (functions[layer] = []);
					return this;
				},

				addFunctions: function(){
					utils.getFunctions(layer, obj, obj, obj.name, functions[layer]);
					return this;
				},

				setIndex: function(){
					functions[layer].forEach(function(func, index){
						func.index = index;
					});
					return this;
				},

				setNext: function(){
					var arr = functions[layer];
					arr.forEach(function(func, index){
						if (index === arr.length - 1) return;
						func.next = arr[index + 1];
					});
					return this;
				},

				setLast: function(){
					var arr = functions[layer];
					arr[arr.length - 1].isLast = true;
					return this;
				}

				}).initThisLayer().addFunctions().setIndex().setNext().setLast();
			},

			getNextFunc: function(layer){
				var arr = functions[layer];
				return arr ? arr.shift() : /* istanbul ignore next */ null;
			},

			clearRemainFunctions: function(func){
				var root = func.root;
				var arr = functions[func.layer];
				var i;

				for (i = 0; i < arr.length; i++) {

					/* istanbul ignore else */
					if (arr[i].root === root) {
						arr.splice(i, 1);
						i--;
					}
				}
			},

			clear: function(){
				functions = {};
			}
		};

		var utils = {
			getFunctions: function (layer, root, obj, keyPath, arr) {
				Object.keys(obj).forEach(function (key) {
					var thisKeyPath = keyPath + "." + key;
					var prop = obj[key];

					if (typeof prop === 'object') {
						utils.getFunctions(layer, root, prop, thisKeyPath, arr);
					}

					if (typeof prop === 'function') {
						prop.keyPath = thisKeyPath;
						prop.name = key;
						prop.parent = obj;
						prop.root = root;
						prop.layer = layer;
						arr.push(prop);
					}
				});
			}
		};

		module.exports = (data);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(13),
		__webpack_require__(15),
		__webpack_require__(17),
		__webpack_require__(22),
		__webpack_require__(8)
	)})

	(function(pass, flag, status, global, layer){

		var run = {
			do: function(func){

				status.maxLayer.set(layer.get());
				layer.add();

				// Bind the current tasks object to "this".
				var result = func.apply(func.root, pass.getArguments());

				// Abort Tas
				if (global.isDone.get()) {
					return;
				}

				// If the result is an Array, save it
				// to pass to the next function or tasks.
				if (result instanceof Array) {
					pass.saveArguments(result);
				}
				else if (typeof result === 'string'){
					flag.save(result);
				}

				layer.sub();
				return result;
			}
		};

		module.exports = (run);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(14)
	)})

	(function(array){

		var pass = Object.create(array);

		// Alias
		pass.saveArguments = pass.set;
		pass.getArguments = pass.get;

		module.exports = (pass);
	});
},

function(module, exports) {

	(function(){

		var array = {
			data: [],

			get: function(){
				return this.data;
			},

			set: function(arr){
				this.data = arr;
			},

			pop: function(){
				return this.data.pop();
			},

			push: function(element){
				this.data.push(element);
			},

			shift: function(){
				return this.data.shift();
			},

			unshift: function(element){
				this.data.unshift(element);
			},

			clear: function(){
				this.data = [];
			},

			reset: function(){
				this.clear();
			}
		};

		module.exports = (array);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(16)
	)})

	(function(string){

		var flag = Object.create(string);
		module.exports = (flag);
	});
},

function(module, exports) {

	(function(){

		var string = {
			data: "",

			get: function(){
				return this.data;
			},

			set: function(str){
				this.data = str;
			},

			save: function(str){
				this.set(str);
			},

			clear: function(){
				this.data = "";
			},

			reset: function(){
				this.clear();
			}
		};

		module.exports = (string);
	})();
},

function(module, exports, __webpack_require__) {

	module.exports = {

		isGoNext: __webpack_require__(18),
		isBreak: __webpack_require__(20),
		maxLayer: __webpack_require__(21),

		reset: function(){
			this.isGoNext.reset();
			this.isBreak.reset();
		}
	};
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(19)
	)})

	(function(boolean){

		var isGoNext = Object.create(boolean);
		module.exports = (isGoNext);
	});
},

function(module, exports) {

	(function(){

		var DEFAULT = false;

		var boolean = {
			value: DEFAULT,

			get: function(){
				return this.value;
			},

			set: function(val){
				typeof val === 'undefined' && (val = !DEFAULT);
				this.value = val;
			},

			clear: function(){
				this.value = DEFAULT;
			},

			reset: function(){
				this.clear();
			}
		};

		module.exports = (boolean);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(19)
	)})

	(function(boolean){

		var isBreak = Object.create(boolean);
		module.exports = (isBreak);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(7)
	)})

	(function(number){

		var maxLayer = Object.create(number);
		module.exports = (maxLayer);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(23),
		__webpack_require__(24),
		__webpack_require__(25)
	)})

	(function(isAbort, isDone, currentFunc){

		module.exports = {
			isAbort: isAbort,
			isDone: isDone,
			currentFunc: currentFunc,

			reset: function(){
				isAbort.reset && isAbort.reset();
				isDone.reset && isDone.reset();
				currentFunc.reset && currentFunc.reset();
			}
		};
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(19)
	)})

	(function(boolean){

		var isAbort = Object.create(boolean);
		module.exports = (isAbort);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(19)
	)})

	(function(boolean){

		var isDone = Object.create(boolean);
		module.exports = (isDone);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(26)
	)})

	(function(object){

		var currentFunc = Object.create(object);
		module.exports = (currentFunc);
	});
},

function(module, exports) {

	(function(){

		var object = {
			data: {},
			
			get: function(prop){
				return typeof prop === 'undefined' ? this.data : this.data[prop];
			},

			set: function(data, prop){
				typeof prop === 'undefined' ? (this.data = data) : (this.data[prop] = data);
			},

			save: function(data, prop){
				this.set(data, prop);
			},

			clear: function(){
				this.data = {};
			},

			reset: function(){
				this.clear();
			}
		};

		module.exports = (object);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(28),
		__webpack_require__(11),
		__webpack_require__(17),
		__webpack_require__(22)
	)})

	(function(checker, data, status, global){

		var exec = {
			do: function(units, layer){
				var func, result, isBreakTask, isLoop, isContinue;

				/* istanbul ignore if */
				if (checker.isAbortTas()) return;

				while(func = data.getNextFunc(layer)) {
					global.currentFunc.save(func);

					if (checker.isForEachFunc(func) && func.isLast === true) {
						isLoop = true;
					}

					status.reset();
					result = units.run(func);

					if (global.isDone.get()) {
						break;
					}

					if (checker.isAbortTas(result)) {
						global.isAbort.set();
						break;
					}

					if (checker.isBreakCurrentTasks(result)) {
						isBreakTask = true;
						break;
					}

					if (checker.isIgnoreThisFunc(result)) {
						status.isGoNext.set();
					}

					if (checker.isAwaitInSyncFunc(result)) {
						global.isAbort.set();
						break;
					}

					if (checker.isContinue(result)) {
						isContinue = true;
						break;
					}

					if (checker.isSyncTasksFunc(func) || checker.isGoNext()) {
						continue;
					}

					/* istanbul ignore else */
					if (checker.isAwaitTasksFunc(func)) {
						global.isAbort.set();
						break;
					}
				}

				if (isBreakTask) {
					data.clearRemainFunctions(func);
				}

				if (isLoop || isContinue) {
					var loop = __webpack_require__(29);
					loop.continue(isLoop);
				}
			}
		};

		module.exports = (exec);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(17),
		__webpack_require__(22)
	)})

	(function(status, global){

		var checker = {
			isAwaitTasksFunc: function(func){
				return func.await || func.root.await;
			},

			isAwaitInSyncFunc: function(result){
				return result === 'await';
			},

			isBreakCurrentTasks: function(result){
				return result === "break" || result === false || status.isBreak.get();
			},

			isAbortTas: function(result){
				return result === "abort" || global.isAbort.get();
			},

			isIgnoreThisFunc: function(result){
				return result === 'ignore';
			},

			isSyncTasksFunc: function(func){
				return !checker.isAwaitTasksFunc(func);
			},

			isGoNext: function(){
				return status.isGoNext.get();
			},

			isForEachFunc: function(func) {
				return func.root.forEach === true;
			},

			isContinue: function(result){
				return result === 'continue';
			}
		};

		module.exports = (checker);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(30),
		__webpack_require__(22),
		__webpack_require__(10),
		__webpack_require__(11),
		__webpack_require__(31)
	)})

	(function(data, global, units, udata, util){

		var loop = {
			do: function(){

				/* istanbul ignore next */
				if (global.isAbort.get() === true) {
					return;
				}

				var elements = data.getElements();
				var element = elements.shift();
				if (!element) return;

				var tas = data.getTas();
				var tasks = data.getTasks();
				var index = data.getIndex();

				var thisTasks = util.object.extend(tasks);
				/* istanbul ignore else */
				if (typeof thisTasks.init === 'function') {
					thisTasks.init(element, index, elements);
					delete thisTasks.init;
				}

				units.do(tas, thisTasks);
			},

			continue: function(isNoNeedToClear){
				global.isAbort.set(false);

				if (!isNoNeedToClear) {
					var func = global.currentFunc.get();
					udata.clearRemainFunctions(func);
				}

				loop.do();
			}
		};

		module.exports = (loop);
	});
},

function(module, exports) {

	(function(){

		var loop = {
			data: {},
			currentId: null,

			save: function(elements, tas, tasks){
				var id = Date.now();

				this.currentId = id;
				this.data[id] = {
					elements: elements,
					tas: tas,
					tasks: tasks,
					index: -1
				};

				return id;
			},

			get: function(id, ename){
				return this.data[id || this.currentId][ename];
			},

			set: function(id, ename, value){
				return this.data[id || this.currentId][ename] = value;
			},

			getElements: function(id) {
				return this.get(id, 'elements');
			},

			getTas: function(id) {
				return this.get(id, 'tas');
			},

			getTasks: function(id) {
				return this.get(id, 'tasks');
			},

			getIndex: function(id) {
				var val = this.get(id, 'index');
				this.set(id, 'index', val ++);
				return val;
			}
		};

		module.exports = (loop);
	})();
},

function(module, exports, __webpack_require__) {

	module.exports = {
		object: __webpack_require__(32),
		string: __webpack_require__(33)
	};
},

function(module, exports) {

	(function(){

		var extend = {
			do: function(target, source, checker){
				Object.keys(source).forEach(function (key) {

					//if (typeof source[key] === 'object' && typeof target[key] === 'object') {
					//	extend.do(target[key], source[key]);
					//}

					/* istanbul ignore else */
					if (typeof target[key] === 'undefined' && (!checker || checker(source, target, key))) {
						target[key] = source[key];
					}
				});
			}
		};

		var object = {
			extend: function () {
				var args = [].slice.call(arguments);
				var target = args.length > 1 ? args.shift() : /* istanbul ignore next */ {};

				args.forEach(function (source) {
					extend.do(target, source);
				});

				return target;
			},

			cloneMethods: function(){
				var args = [].slice.call(arguments);
				var target = args.length > 1 ? args.shift() : /* istanbul ignore next */ {};

				var checker = {
					do: function(source, target, key){
						return typeof source[key] === 'function';
					}
				};

				args.forEach(function (source) {
					extend.do(target, source, checker.do);
				});

				return target;
			}
		};

		module.exports = (object);
	})();
},

function(module, exports) {

	(function(){

		var string = {
			repeat: function (str, times) {
				return new Array(times + 1).join(str);
			}
		};

		module.exports = (string);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(29),
		__webpack_require__(30),
		__webpack_require__(13)
	)})

	(function(loop, data, pass){

		var forEach = {
			do: function(tas, tasks){
				var args = pass.getArguments();

				/* istanbul ignore next */
				if (!args || !(args instanceof Array) || !(args[0] instanceof Array)) return;

				var elements = args[0];
				data.save(elements, tas, tasks);
				loop.do();
			},

			continue: function(){
				loop.continue();
			}
		};

		module.exports = (forEach);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(36),
		__webpack_require__(37)
	)})

	(function(await, next){

		var async = {
			await: function(args){
				await.init(args);
			},

			next: function(args){
				next.do(args);
			}
		};

		module.exports = (async);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(3)
	)})

	(function(core){

		var await = {
			init: function(args){
				this.mark(args);
				core.do(args);
			},

			mark: function(args){
				args.forEach(function(arg){
					// arg is an Object or a Function
					arg instanceof Object && (arg.await = true);
				});
			}
		};

		module.exports = (await);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(22),
		__webpack_require__(4),
		__webpack_require__(8),
		__webpack_require__(10),
		__webpack_require__(13),
		__webpack_require__(17),
		__webpack_require__(34)
	)})

	(function(global, tas, layer, units, pass, status, forEach){

		var next = {
			do: function(args){
				pass.saveArguments(args);
				status.isGoNext.set();
				global.isAbort.set(false);

				next.resume();
			},

			resume: function(){
				var tasks;
				var lay = status.maxLayer.get();

				while(lay >= 0) {
					layer.set(lay);

					// Handle the remain functions
					units.exec(lay);

					// Handle the tasks in sequence
					while (!global.isAbort.get() && (tasks = tas.getNextTasks(lay))) {
						global.reset();

						if (tasks.forEach === true) {
							forEach.do(tas, tasks);
						}
						else {
							units.do(tas, tasks);
						}
					}

					lay --;
				}
			}
		};

		module.exports = (next);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(39),
		__webpack_require__(40),
		__webpack_require__(41),
		__webpack_require__(35)
	)})

	(function(all, race, convert, async){

		var promise = {
			promise: function(tasks){
				tasks.done = function(err, data){
					promise.done([err, data]);
				};

				promise.exec(tasks);
			},

			all: function(tasks){
				all.do(tasks, promise);
			},

			race: function(tasks){
				race.do(tasks, promise);
			},
			
			exec: function(tasks){
				Object.defineProperty(tasks, "done", {
					enumerable: false
				});

				Object.keys(tasks).forEach(function(func){
					tasks[func]();
				});
			},

			done: function(args){
				async.next(args);
			},

			cancel: function(args){
				race.cancel(args);
			},

			convert: function(args, type){
				convert.do(args, type, promise, async);
			}
		};

		module.exports = (promise);
	});
},

function(module, exports) {

	(function(){

		var all = {
			do: function(tasks, promise){
				var len = Object.keys(tasks).length;
				var count = 0;
				var error = null;
				var results = [];

				tasks.done = function(err, data){
					count ++;

					err && /* istanbul ignore next */ (error = err);
					results.push(data);

					if (count === len) {
						promise.done([error, results]);
					}
				};

				promise.exec(tasks);
			}
		};

		module.exports = (all);
	})();
},

function(module, exports) {

	(function(){

		var race = {
			do: function(tasks, promise){
				var count = 0;

				tasks.done = function(err, data){
					if (++count === 1) {
						promise.done([err, data]);
					}
				};

				promise.exec(tasks);
			},

			cancel: function(handlers){

				/* istanbul ignore next */
				if (!handlers || !(handlers instanceof Array)) return;

				handlers.forEach(function(handle){

					/* istanbul ignore next */
					if (handle.abort) {

						// For web
						if (typeof XMLHttpRequest !== 'undefined' && handle instanceof XMLHttpRequest) {
							if (handle.readyState !== XMLHttpRequest.UNSENT) {
								handle.abort();
							}
						}
						else {
							// The ajax or request object has abort() method, such as
							// Superagent (one of Node.js third-party modules).
							handle.abort();
						}
					}
					else {
						// Valid for NodeJS and web.
						clearTimeout(handle);
					}
				});
			}
		};

		module.exports = (race);
	})();
},

function(module, exports) {

	(function(){

		var convert = {
			do: function(args, type, promise, async){
				var describe = "";
				var obj = {};

				({
				setDescribe: function(){
					typeof args[0] === "string" && (describe = args.shift());
					return this;
				},

				convertFuncToObj: function(){
					var tasks = {};
					if (args[0] instanceof Function) {
						args.forEach(function(arg, index){
							tasks['t' + (index + 1)] = arg;
						});
						args = [tasks];
					}
					return this;
				},

				packPromiseTask: function(){
					obj["promise_" + type] = function(){
						promise[type](args[0]);
					};
					return this;
				},

				applyToAwait: function(){
					var tasks = [obj];
					describe && (tasks.unshift(describe));
					async.await(tasks);
					return this;
				}

				}).setDescribe().convertFuncToObj().packPromiseTask().applyToAwait();
			}
		};

		module.exports = (convert);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(43),
		__webpack_require__(34)
	)})

	(function(forEach, forEachDo){

		var array = {
			forEach: function(args){
				forEach.init(args);
			},

			continue: function(){
				forEachDo.continue();
			}
		};

		module.exports = (array);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(3)
	)})

	(function(core){

		var forEach = {
			init: function(args){
				this.mark(args);
				core.do(args);
			},

			mark: function(args){
				args.forEach(function(arg){
					// arg is an Object or a Function
					arg instanceof Object && (arg.forEach = true);
				});
			}
		};

		module.exports = (forEach);
	});
}


]);}));