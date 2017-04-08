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

	(function(){arguments[0](
		__webpack_require__(1)
	)})

	(function(tas){

		module.exports = tas;
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(2),
		__webpack_require__(28),
		__webpack_require__(9),
		__webpack_require__(17)
	)})

	(function(app, util, layer, maxLayer){

		var basic = {

			// Abort Tas from nested function (closures).
			break: function(){
				app.break();
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

		module.exports = util.object.extend(app.entry, basic, async, promise);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(3),
		__webpack_require__(22),
		__webpack_require__(24),
		__webpack_require__(28)
	)})

	(function(core, async, promise, util){

		var tas = {
			entry: function(){
				tas.do([].slice.call(arguments));
			},

			do: function(args){
				core.do(args);
			},

			break: function(){
				core.break();
			}
		};

		var asy = {
			await: function(args){
				args.await = true;
				tas.do(args);
			},

			next: function(args){
				async.do(args);
			}
		};

		var pro = {
			promise: function(args){
				pro.convert(args, "promise");
			},

			all: function(args){
				pro.convert(args, "all");
			},

			race: function(args){
				pro.convert(args, "race");
			},

			convert: function(args, type){
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
					obj["Promise " + type] = function(){
						promise[type](args[0]);
					};
					return this;
				},

				applyToAwait: function(){
					var tasks = [obj];
					describe && (tasks.unshift(describe));
					asy.await(tasks);
					return this;
				}

				}).setDescribe().convertFuncToObj().packPromiseTask().applyToAwait();
			}
		};

		module.exports = util.object.extend(tas, asy, pro);
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

			next: function(args){
				tasks.next(args);
			},

			break: function(){
				tasks.break();
			}
		};

		module.exports = (core);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(5),
		__webpack_require__(10),
		__webpack_require__(20)
	)})

	(function(data, units, global){

		var tas = {
			do: function(args){
				data.add(args);
				!global.isAbort.get() && tas.exec();
			},

			exec: function(){
				var tasks = data.getNextTasks();
				units.do(tas, tasks);
			},

			break: function(){
				global.isAbort.set();
			},

			getNextTasks: function(layer){
				return data.getNextTasks(layer);
			}
		};

		module.exports = (tas);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(6),
		__webpack_require__(8)
	)})

	(function(id, sequence){

		var objects = {

			add: function(args){
				var describe;
				var isAwait = args.await;

				({
				saveDescribe: function(){
					if (typeof args[0] === 'string'){
						describe = args.shift();
					}
					return this;
				},

				packFunctions: function(){
					if (args[0] instanceof Function) {
						var obj = {};
						args.forEach(function(func, index){
							obj['t' + (index + 1)] = func;
						});
						args = [obj];
					}
					return this;
				},

				saveTasks: function(){
					args.forEach(function(obj, index){
						id.add();

						if (!obj.name) {
							obj.name = utils.getObjName(describe, args, id.get(), index);
						}

						isAwait && (obj.await = true);
						sequence.saveTasks(obj);
					});
					return this;
				}

				}).saveDescribe().packFunctions().saveTasks();
			},

			getNextTasks: function(layer){
				return sequence.getNextTasks(layer);
			}
		};

		var utils = {
			getObjName: function (describe, args, id, index) {
				var name = "";
				if (describe) {
					if (args.length === 1) {
						name = describe;
					}
					else {
						name = describe + "[" + (index + 1) + "]";
					}
				}
				else {
					name = 'Tasks[' + id + ']';
				}
				return name;
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
			},

			sub: function(){
				this.value --;
			},

			set: function(val){
				this.value = val;
			},

			save: function(val){
				this.set(val);
			}
		};

		module.exports = (number);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(9)
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
				return this.data[lay || layer.get()].shift();
			}
		};

		module.exports = (sequence);
	});
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
		__webpack_require__(11),
		__webpack_require__(12),
		__webpack_require__(18),
		__webpack_require__(20)
	)})

	(function(data, run, exec, global){

		var units = {
			tas: {},

			do: function(tas, tasks){
				units.tas = tas;

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
				global.isAbort.set();
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
				}

				}).initThisLayer().addFunctions().setIndex().setNext();
			},

			getNextFunc: function(layer){
				return functions[layer].shift();
			},

			clearRemainFunctions: function(func){
				var root = func.root;
				var arr = functions[func.layer];
				var i;

				for (i = 0; i < arr.length; i++) {
					if (arr[i].root === root) {
						arr.splice(i, 1);
						i--;
					}
				}
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
		__webpack_require__(14),
		__webpack_require__(9)
	)})

	(function(pass, status, layer){

		var run = {
			do: function(func){

				status.maxLayer.set(layer.get());
				layer.add();

				//Bind the current tasks object to "this".
				var result = func.apply(func.root, pass.getArguments());

				// If the result is an Array, save it
				// to pass to the next function or tasks.
				if (result instanceof Array) {
					pass.saveArguments(result);
				}

				layer.sub();
				return result;
			}
		};

		module.exports = (run);
	});
},

function(module, exports) {

	(function(){

		var pass = {
			data: [],
			
			getArguments: function(){
				return this.data;
			},

			saveArguments: function(arr){
				this.data = arr;
			}
		};

		module.exports = (pass);
	})();
},

function(module, exports, __webpack_require__) {

	module.exports = {
		isGoNext: __webpack_require__(15),
		maxLayer: __webpack_require__(17)
	};
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(16)
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

			reset: function(){
				this.set(DEFAULT);
			}
		};

		module.exports = (boolean);
	})();
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
		__webpack_require__(19),
		__webpack_require__(11),
		__webpack_require__(14),
		__webpack_require__(20)
	)})

	(function(checker, data, status, global){

		var exec = {
			do: function(units, layer){
				var func, result, isBreak;
				if (global.isAbort.get()) return;

				while(func = data.getNextFunc(layer)) {
					status.isGoNext.reset();
					result = units.run(func);

					if (global.isAbort.get()) {
						break;
					}

					if (checker.isBreakCurrentTasks(result)) {
						isBreak = true;
						break;
					}

					if (checker.isBreakTas(result)) {
						global.isAbort.set();
						break;
					}

					if (!checker.isAwaitTasksFunc(func) || status.isGoNext.get()) {
						continue;
					}

					if (checker.isAwaitTasksFunc(func)) {
						global.isAbort.set();
						break;
					}
				}

				if (isBreak) {
					data.clearRemainFunctions(func);
				}
			}
		};

		module.exports = (exec);
	});
},

function(module, exports) {

	(function(){

		var checker = {
			isAwaitTasksFunc: function(func){
				return func.root.await;
			},

			isBreakCurrentTasks: function(result){
				return result === "break" || result === false;
			},

			isBreakTas: function(result){
				return result === "break!";
			}
		};

		module.exports = (checker);
	})();
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(21)
	)})

	(function(isAbort){

		module.exports = {
			isAbort: isAbort,

			reset: function(){
				isAbort.reset();
			}
		};
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(16)
	)})

	(function(boolean){

		var isAbort = Object.create(boolean);
		module.exports = (isAbort);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(23),
		__webpack_require__(20),
		__webpack_require__(13),
		__webpack_require__(14)
	)})

	(function(resume, global, pass, status){

		var async = {
			do: function(args){
				pass.saveArguments(args);
				status.isGoNext.set();

				if (global.isAbort.get()) {
					async.resume();
				}
			},

			resume: function(){
				resume.do();
			}
		};

		module.exports = (async);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(20),
		__webpack_require__(4),
		__webpack_require__(9),
		__webpack_require__(10),
		__webpack_require__(14)
	)})

	(function(global, tas, layer, units, status){

		var resume = {
			do: function(){
				({
				setState: function(){
					global.isAbort.set(false);
					return this;
				},

				handleTheTasks: function(){
					var tasks;
					var lay = status.maxLayer.get();

					while(lay >= 0) {
						layer.set(lay);

						// Handle the remain functions
						units.exec(lay);

						// Handle the tasks in cache
						while (!global.isAbort.get() && (tasks = tas.getNextTasks(lay))) {
							global.reset();
							units.do(tas, tasks);
						}

						lay --;
					}
					return this;
				}
				}).setState().handleTheTasks();
			}
		};

		module.exports = (resume);
	});
},

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(25),
		__webpack_require__(26),
		__webpack_require__(22)
	)})

	(function(all, race, async){

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
				async.do(args);
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

					err && (error = err);
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

function(module, exports, __webpack_require__) {

	(function(){arguments[0](
		__webpack_require__(27)
	)})

	(function(canceler){

		var race = {
			do: function(tasks, promise){
				var count = 0;

				tasks.done = function(err, data, handlers){
					if (++count === 1) {
						if (handlers && typeof handlers === 'object') {
							if (canceler.doWithCustomize(handlers) === false) {
								canceler.doWithDefault(handlers);
							}
						}
						promise.done([err, data]);
					}
				};

				promise.exec(tasks);
			}
		};

		module.exports = (race);
	});
},

function(module, exports) {

	(function(){

		var canceler = {
			get: function(handlers){
				var func;

				if (typeof handlers.do !== 'undefined' && handlers.do instanceof Function){
					func = handlers.do;
				}
				else {
					Object.keys(handlers).find(function(key){
						if (handlers[key] instanceof Function) {
							func = handlers[key];
							return key;
						}
					});
				}
				return func;
			},

			doWithCustomize: function(handlers){
				var func = canceler.get(handlers);
				func && func();
				return typeof func !== 'undefined';
			},

			doWithDefault: function(handlers){
				handlers.forEach(function(handler){

					// Only valid for web.
					if (typeof XMLHttpRequest !== "undefined" && handler instanceof XMLHttpRequest) {
						if (handler.readyState !== XMLHttpRequest.UNSENT) {
							handler.abort();
						}
					}
					else {
						// Valid for NodeJS and web.
						clearTimeout(handler);
					}
				});
			}
		};

		module.exports = (canceler);
	})();
},

function(module, exports, __webpack_require__) {

	module.exports = {
		object: __webpack_require__(29),
		string: __webpack_require__(30)
	};
},

function(module, exports) {

	(function(){

		var object = {
			extend: function () {
				var args = [].slice.call(arguments);
				var target = args.length > 1 ? args.shift() : {};

				var extend = {
					do: function(target, source){
						Object.keys(source).forEach(function (key) {

							if (typeof source[key] === 'object' && typeof target[key] === 'object') {
								extend.do(target[key], source[key]);
							}

							if (typeof target[key] === 'undefined') {
								target[key] = source[key];
							}
						});
					}
				};

				args.forEach(function (source) {
					extend.do(target, source);
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
}


]);}));