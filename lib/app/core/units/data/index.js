/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

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
