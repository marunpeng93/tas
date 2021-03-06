var count = 0;

var btnOnClick = {
	init: function(){
		this.count = ++ count;
	},

	syncStart: function(){
		log(this.count, 'Sync code started');
	},

	asyncStart: function(){
		log(this.count, 'Async code started');
		window.setTimeout(function(){

			// Do something, such as
			// try ... catch()...
			// to handle the error.

			// Then go to the next function.
			tas.next();

		}.bind(this), Math.random() * 2000 + 1000);
		return "await";
	},

	asyncEnd: function(){
		log(this.count, 'Async code terminated');
	},

	syncEnd: function(){
		log(this.count, 'Sync code terminated');
	},

	done: function(){
		tas.done();
	}
};

var log = function(count, str){
	var log = document.getElementById('log');
	var html = count + ') ' + str + '<br/>';
	log.insertAdjacentHTML('beforeend', html);
};

var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
	tas(btnOnClick);
});
