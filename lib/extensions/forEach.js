
var Tas;
var data = require('./../core/data');
var runner = require('./../core/runner');
var tasks = require('./../core/tasks');
var units = require('./../core/units');
var pass = require('./../core/pass');

var elements;
var task;
var index = 0;

var forEach = {

	init: function(Tas_){
		Tas = Tas_;
		runner.saveForEach(this);

		Tas.forEach = this.forEach;
		Tas.continue = this.continue;

		data.extensions.isForEachEnabled = true;
	},

	unload: function(){
		data.extensions.isForEachEnabled = false;

		Tas.forEach = null;
		Tas.continue = null;
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
