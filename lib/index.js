
var runner = require('./core/runner');
var tasks = require('./core/tasks');
var pass = require('./core/pass');
var flag = require('./core/flag');
var abort = require('./core/abort');
var break_ = require('./core/break');
var begin = require('./core/begin');

var Tas = function(obj){
	if (begin.is()) {
		begin.do(obj);
	}
	else if (flag.isAbort()){
		return;
	}

	tasks.add(obj);
};

Tas.await = function(obj){
	begin.is() && begin.do(obj);

	obj.isAwait = true;
	tasks.add(obj);
};

Tas.promise = function(func){
	Tas.await(func);
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

Tas.abort = function(msg){
	abort.do(msg);
};

Tas.begin = function(){
	begin.set();
};

Tas.load = function(){
	var loader = require('./extensions/loader');
	loader.init(Tas);
	loader.load([].slice.call(arguments));
	return Tas;
};

Tas.unload = function(){
	var loader = require('./extensions/loader');
	loader.unload([].slice.call(arguments));
	return Tas;
};

module.exports = Tas;
