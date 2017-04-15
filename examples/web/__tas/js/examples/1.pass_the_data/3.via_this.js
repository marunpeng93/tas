/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var viaThis = function(){

	var a  = 1;

	tas({
		t1: function(){
			this.a = 1;
		},

		t2: {
			t3: function(){
				this.a ++; // 2
			},

			t4: function(){
				[1].forEach(function(){
					this.a ++; // 3

				}.bind(this)); // bind this, important!

				this.a ++; // 4
			}
		},

		t5: function(){
			this.a ++; // 5
			a = this.a;
		}
	});

	return {
		get: function(){
			return a; // 5
		}
	};

}();