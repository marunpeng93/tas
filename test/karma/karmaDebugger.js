
var karmaDebugger = {
	box: null,

	init: function(){
		this.createBox();
		return this;
	},

	createBox: function(){
		var win, doc, box;

		({
		init: function(){
			win = window.parent || window;
			doc = win.document;
			return this;
		},

		createBox: function(){
			box = doc.createElement('div');
			box.id = '__debug__karma__';
			box.style.width = '100%';
			box.style.height = '100%';
			box.style.padding = '12px';
			box.style.fontFamily = 'Courier';
			doc.body.appendChild(box);
			return this;
		},

		hideIFrame: function(){
			var iFrame = doc.getElementById('context');
			iFrame.style.display = 'none';
			return this;
		}

		}).init().createBox().hideIFrame();
		this.box = box;
	},

	getBox: function(){
		!this.box && this.createBox();
		return this.box;
	},

	info: function(info, result, count, describe, exp){
		var box = this.getBox();
		var index = 0;
		var str = info.replace(/\%s/g, function () {
			switch(index++){
				case 0: return result;
				case 1: return count;
				case 2: return describe;
				case 3: return exp;
			}
		});
		box.innerHTML += str + '<br/>';
	},

	log: function(){
		console.log.apply(console, arguments);
	}
};
