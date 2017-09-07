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

	var runner = __webpack_require__(2);
	var tasks = __webpack_require__(4);
	var pass = __webpack_require__(7);
	var flag = __webpack_require__(6);
	var abort = __webpack_require__(8);
	var break_ = __webpack_require__(9);
	var begin = __webpack_require__(10);

	var Tas = function(obj, obj2){
		if (obj === 'begin') {
			obj = begin.do(obj2);
		}
		else if (flag.isAbort()){
			return;
		}

		tasks.add(obj);
	};

	Tas.await = function(obj, obj2){
		if (obj === 'begin') {
			obj = begin.do(obj2);
		}

		obj.isAwait = true;
		flag.setHasAsync(true);
		tasks.add(obj);
	};

	Tas.promise = function(func, func2){
		Tas.await(func, func2);
	};

	Tas.next = function(a0, a1){
		var len = arguments.length;

		len === 2 ? pass.save2(a0, a1) :
			len === 1 ? pass.save1(arguments[0]) :
				len === 0 ? pass.save0() :
					pass.saveArray([].slice.call(arguments));

		runner.next();
	};

	Tas.resolve = function(err, data){
		pass.save2(err, data);
		runner.next();
	};

	Tas.break = function(){
		break_.do();
	};

	Tas.abort = function(){
		abort.do();
	};

	/* istanbul ignore next */
	Tas.printFlags = function(){
		var data = __webpack_require__(3);
		console.log(data.flag);
	};

	Tas.load = function(){
		var loader = __webpack_require__(11);
		loader.init(Tas);
		loader.load([].slice.call(arguments));
		return Tas;
	};

	module.exports = Tas;
},

function(module, exports, __webpack_require__) {

	var data = __webpack_require__(3);
	var tasks = __webpack_require__(4);
	var units = __webpack_require__(5);
	var pass = __webpack_require__(7);
	var flag = __webpack_require__(6);
	var abort = __webpack_require__(8);
	var break_ = __webpack_require__(9);

	var Tas;
	var forEach;

	var runner = {
		exec: function(queue, isWithLayer){
			var flag = data.flag;

			/* istanbul ignore next */
			if (flag.isAwait) return;

			var func;
			var result;
			var run = runner[isWithLayer ? 'runFuncWithLayer' : 'runFunc'];

			while(func = queue.shift()) {
				result = run(func);

				if (flag.isAwait) {
					break;
				}

				if (result === 'await' || func.isAwait === true) {
					flag.isAwait = true;
					break;
				}
			}
		},

		execFunc: function(func){
			var flag = data.flag;

			/* istanbul ignore next */
			if (flag.isAwait) return;

			var result = runner.runFuncWithLayer(func);
			if (result === 'await' || func.isAwait === true) {
				flag.isAwait = true;
			}
		},

		runFuncWithLayer: function(func){
			data.extensions.isLogTreeEnabled && Tas.logTree(func.name);

			data.maxLayer = data.layer;
			data.layer ++;

			var result = runner.runFunc(func, true);
			data.layer > 0 && data.layer --;

			return result;
		},

		runFunc: function(func, isPrintedLogTree){
			var isForEachEnabled = data.extensions.isForEachEnabled;
			var isLogTreeEnabled = data.extensions.isLogTreeEnabled;

			!isPrintedLogTree && isLogTreeEnabled && Tas.logTree(func.name);

			var args = data.pass;
			var result = args.isHasArgs ? func.apply(null, args) : func();

			if (isForEachEnabled && func.isTheLastFunc && func.root.isForEach) {
				forEach.loop();
			}
			else {
				result === undefined ? pass.save0() :
					Array.isArray(result) ? pass.save(result) :
						result === 'break' ? break_.do() :
							result === 'abort' ? abort.do() :
								result === 'continue' ? forEach.continue() :
									pass.save1(result);

				return result;
			}
		},

		next: function(){
			var d = data;
			var f = d.flag;
			var isForEachEnabled = d.extensions.isForEachEnabled;
			
			var task;
			var lay = d.maxLayer;
			var arrTasks;

			f.isAwait = false;
			while(lay >= 0) {
				d.layer = lay;

				// Handle the remain functions
				d.units[lay] && d.units[lay].length && runner.exec(d.units[lay]);

				// Handle the tasks in sequence
				arrTasks = d.tasks[lay];

				// If use tas.next() instead of return in tas(), the arrTasks will be undefined.
				/* istanbul ignore else */
				if (typeof arrTasks !== 'undefined') {

					while (!f.isAwait && (task = arrTasks.shift())) {
						f.isAwait = false;

						if (typeof task === 'function') {
							runner.execFunc(task);
						}
						else
						if (isForEachEnabled && task.isForEach === true) {
							forEach.exec(task);
						}
						else {
							units.do(task);
						}
					}
				}

				lay --;
			}

			// When all tasks done, then restore flag isAwait to false
			if (!d.tasks[0].length) {
				flag.setIsAwait(false);
			}
		},

		saveTas: function(Tas_){
			Tas = Tas_;
		},

		saveForEach: function(forEach_){
			forEach = forEach_;
		}
	};

	module.exports.__proto__ = runner;
},

function(module, exports) {

	var data = {
		layer: 0,
		maxLayer: 0,

		tasks: {},
		units: {},
		pass: [],

		flag: {
			hasAsync: false,
			isAwait: false,
			isAbort: false
		},

		extensions: {
			isPromiseAllEnabled: false,
			isPromiseRaceEnabled: false,
			isForEachEnaboed: false,
			isLogTreeEnabled: false
		},

		currentTask: {
			layer: 0,
			root: null
		}
	};

	module.exports.__proto__ = data;
},

function(module, exports, __webpack_require__) {

	var data = __webpack_require__(3);
	var runner = __webpack_require__(2);
	var units = __webpack_require__(5);
	var flag = __webpack_require__(6);

	var tasks = {
		add: function(obj){
			var d = data;
			var flag = d.flag;
			var type = typeof obj;

			// A function
			if (type === 'function' && !d.layer && !flag.isAwait) {
				runner.execFunc(obj);
			}
			else {
				// An object (a set of functions)
				type === 'object' && !obj.isTheLastFunctionMarked && (this.markTheLastFunction(obj));
				this.addToLayer(obj);
				!flag.isAwait && units.do(d.tasks[d.layer].shift());
			}
		},

		addToLayer: function(obj){
			var d = data;
			var layer = d.layer;
			var tasks = d.tasks;

			obj.layer = layer;

			typeof tasks[layer] === 'undefined' && (tasks[layer] = []);
			tasks[layer].push(obj);
		},

		markTheLastFunction: function(task){
			var keys = Object.keys(task);
			var func;

			for (var i = keys.length - 1; i >= 0; i --) {
				func = task[keys[i]];
				if (typeof func === 'function') {
					break;
				}
			}

			func.isTheLastFunc = true;
			task.isTheLastFunctionMarked = true;
		},

		clearTheRemainingTasks: function(){
			var d = data;
			var maxLayer = d.maxLayer;
			var arrTasks;
			var lay;

			// clear the remaining functions in this tasks
			for (lay = maxLayer; lay >= 0; lay --) {
				d.units[lay] && (d.units[lay].length = 0);
			}

			// clear the sub tasks in this tasks
			for (lay = maxLayer; lay > 0; lay --) {
				d.tasks[lay] && (d.tasks[lay].length = 0);
			}

			// clear the remaining tasks in this line
			arrTasks = d.tasks[0];
			while (arrTasks && arrTasks.length) {
				if (arrTasks[0].isFirst) {
					break;
				}
				arrTasks.shift();
			}
		}
	};

	module.exports.__proto__ = tasks;
},

function(module, exports, __webpack_require__) {

	var data = __webpack_require__(3);
	var runner = __webpack_require__(2);

	var units = {
		do: function(task){
			this.add(task);

			var queue = data.units[task.layer];
			queue && queue.length && runner.exec(queue, true);
		},

		add: function(task){
			var d = data;
			var layer = task.layer || 0;

			d.currentTask.layer = layer;
			d.currentTask.root = task;

			typeof d.units[layer] === 'undefined' && (d.units[layer] = []);
			this.getAllFunctions(layer, task, task, task.isAwait, d.units[layer]);
		},

		getAllFunctions: function getAllFunctions(layer, root, obj, isAwait, arr) {
			var key;
			var func;
			var keys = Object.keys(obj);
			var isLogTreeEnabled = data.extensions.isLogTreeEnabled;

			for (var i = 0, len = keys.length; i< len; i ++) {
				key = keys[i];
				func = obj[key];

				if (typeof func === 'object') {
					getAllFunctions(layer, root, func, isAwait, arr);
				}
				else
				if (typeof func === 'function') {
					func.root = root;
					func.layer = layer;
					func.isAwait = isAwait;
					isLogTreeEnabled && !func.name && /* istanbul ignore next */ (func.name = key);
					arr.push(func);
				}
			}
		},

		clearTheRemainingFunctions: function(){
			var d = data;
			var layer = d.currentTask.layer;
			var root = d.currentTask.root;
			var functions = d.units[layer];

			for (var i = 0, len = functions.length; i < len; i ++) {

				/* istanbul ignore else */
				if (functions[i].root === root) {
					functions.shift();
				}
			}
		}
	};

	module.exports.__proto__ = units;
},

function(module, exports, __webpack_require__) {

	var data = __webpack_require__(3);

	var flag = {
		isAbort: function(){
			return data.flag.isAbort;
		},

		setIsAbort: function(val){
			data.flag.isAbort = val;
		},

		setIsAwait: function(val){
			data.flag.isAwait = val;
		},

		setHasAsync: function(val){
			data.flag.hasAsync = val;
		}
	};

	module.exports.__proto__ = flag;
},

function(module, exports, __webpack_require__) {

	var data = __webpack_require__(3);

	var pass = {
		save: function(result){
			var len = result.length;
			len === 2 ? this.save2(result[0], result[1]) :
			len === 1 ? this.save1(result[0]) :
			len === 0 ? this.save0() :
			this.saveArray(result);
		},

		save0: function(){
			var d = data;
			d.pass[0] = undefined;
			d.pass[1] = undefined;
			d.pass.isHasArgs = false;
		},

		save1: function(data_){
			var d = data;
			d.pass[0] = data_;
			d.pass[1] = undefined;
			d.pass.isHasArgs = true;
		},

		save2: function(a0, a1){
			var d = data;
			d.pass[0] = a0;
			d.pass[1] = a1;
			d.pass.isHasArgs = true;
		},

		saveArray: function(arr){
			var d = data;
			d.pass = arr;
			d.pass.isHasArgs = true;
		},

		reset: function(){
			data.pass.length = 0;
			data.pass.isHasArgs = false;
		}
	};

	module.exports.__proto__ = pass;
},

function(module, exports, __webpack_require__) {

	var tasks = __webpack_require__(4);
	var pass = __webpack_require__(7);
	var runner = __webpack_require__(2);
	var flag = __webpack_require__(6);

	var abort = {
		do: function(){

			tasks.clearTheRemainingTasks();
			pass.reset();
			runner.next();

			// Set the flag isAbort for subsequent tasks.
			// Otherwise the subsequent tasks will be executed.
			// When the next "begin" tasks started, it will be restore to false.
			flag.setIsAbort(true);
		}
	};

	module.exports.__proto__ = abort;
},

function(module, exports, __webpack_require__) {

	var units = __webpack_require__(5);

	var break_ = {
		do: function(){
			units.clearTheRemainingFunctions();
		}
	};

	module.exports.__proto__ = break_;
},

function(module, exports, __webpack_require__) {

	var flag = __webpack_require__(6);

	var begin = {
		do: function(obj2){
			obj2.isFirst = true;

			// Restore flag iaAbort to false.
			flag.setIsAbort(false);

			return obj2;
		}
	};

	module.exports = begin;
},

function(module, exports, __webpack_require__) {

	var Tas;

	var loader = {
		init: function(Tas_){
			Tas = Tas_;
		},

		load: function(names){
			names.length === 1 ?
				loader.loadExtension(names[0]) :
					loader.loadExtensions(names);
		},

		loadExtensions: function(names){
			names.forEach(function(name){
				loader.loadExtension(name);
			});
		},

		loadExtension: function(name){
			__webpack_require__(12)("./" + name).init(Tas);
		}
	};

	module.exports.__proto__ = loader;
},

function(module, exports, __webpack_require__) {

	var map = {
		"./forEach": 13,
		"./forEach.js": 13,
		"./loader": 11,
		"./loader.js": 11,
		"./promise-all": 14,
		"./promise-all.js": 14,
		"./promise-race": 16,
		"./promise-race.js": 16,
		"./promise~util": 15,
		"./promise~util.js": 15,
		"./tree": 17,
		"./tree.js": 17
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 12;
},

function(module, exports, __webpack_require__) {

	var Tas;
	var data = __webpack_require__(3);
	var runner = __webpack_require__(2);
	var tasks = __webpack_require__(4);
	var units = __webpack_require__(5);
	var pass = __webpack_require__(7);

	var elements;
	var task;
	var index = 0;

	var forEach = {

		init: function(Tas_){
			Tas = Tas_;
			runner.saveForEach(this);
			data.extensions.isForEachEnabled = true;

			Tas.forEach = this.forEach;
			Tas.continue = this.continue;
		},

		forEach: function(task){
			task.isForEach = true;

			tasks.markTheLastFunction(task);
			data.flag.isAwait ? tasks.add(task) : forEach.exec(task);
		},

		exec: function(task_){
			elements = data.pass[0].slice();
			task = task_;
			index = 0;
			forEach.loop();
		},

		loop: function(){
			var d = data;
			var flag = d.flag;

			while(!flag.isAwait && elements.length) {
				d.layer ++;
				pass.save2(elements.shift(), index ++);
				tasks.add(task);
				d.layer --;
			}
		},

		continue: function(){
			units.clearTheRemainingFunctions();
			forEach.loop();
		}
	};

	module.exports.__proto__ = forEach;
},

function(module, exports, __webpack_require__) {

	var Tas;
	var util = __webpack_require__(15);

	var promiseAll = {
		init: function(Tas_){
			Tas = Tas_;
			Tas.all = this.all;
		},

		all: function(obj, obj2){
			var isBegin = obj === 'begin';
			obj === 'begin' && (obj = obj2);

			var times = Object.keys(obj).length;
			var count = 0;
			var allData = [];

			var This = {
				done: function(err, data){
					count ++;
					allData.push(data);

					if (err || count === times) {
						Tas.resolve(err, allData);
					}
				},

				abort: function(){
					Tas.abort();
					this.done('abort');
				}
			};

			obj = util.convert(obj, This);
			Tas.await.apply(null, isBegin ? ['begin', obj] : [obj]);
		}
	};

	module.exports.__proto__ = promiseAll;
},

function(module, exports) {

	var util = {
		convert: function(obj, This){
			return function(){
				var keys = Object.keys(obj);
				for (var i = 0; i < keys.length; i++) {
					obj[keys[i]].call(This);
				}
			}
		}
	};

	module.exports.__proto__ = util;
},

function(module, exports, __webpack_require__) {

	var Tas;
	var flag = __webpack_require__(6);
	var util = __webpack_require__(15);

	var promiseRace = {
		init: function(Tas_){
			Tas = Tas_;
			Tas.race = this.race;
			Tas.cancel = this.cancel;
		},

		race: function(obj, obj2){
			var isBegin = obj === 'begin';
			obj === 'begin' && (obj = obj2);

			var count = 0;
			var This = {
				done: function(err, data){
					if (++ count === 1) {
						Tas.resolve(err, data);
					}
				},

				abort: function(){
					flag.setIsAwait(false);
					Tas.abort();
				}
			};

			obj = util.convert(obj, This);
			Tas.await.apply(null, isBegin ? ['begin', obj] : [obj]);
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

	module.exports.__proto__ = promiseRace;
},

function(module, exports, __webpack_require__) {

	var Tas;
	var data = __webpack_require__(3);
	var runner = __webpack_require__(2);

	var isShowLogTree = true;
	var tree = {
		init: function (Tas_){
			Tas = Tas_;
			runner.saveTas(Tas);

			Tas.logTree = this.logTree;
			Tas.enableLogTree = this.setIsEnabled;
			Tas.setIsShowLogTree = this.setIsShowLogTree;
		},

		setIsEnabled: function(val){
			data.extensions.isLogTreeEnabled = val;
		},

		setIsShowLogTree: function(val){
			isShowLogTree = val;
		},

		logTree: function(str){
			if (!data.extensions.isLogTreeEnabled) return;

			var layer = data.layer + 1;
			var maxLayer = data.maxLayer + 1;

			var lay = data.flag.isAwait ? maxLayer + 1 : layer;
			var indent = util.repeat(' ', (lay - 1) * 4);
			util.log(('  ' + lay).substr(-2) + '| ' + indent + str);
		}
	};

	var util = {
		log: function(){
			var args = [].slice.call(arguments);
			isShowLogTree && /* istanbul ignore next */ console.log.apply(console, args);
		},

		repeat: function (str, times) {
			return new Array(times + 1).join(str);
		}
	};

	module.exports.__proto__ = tree;
}


]);}));