/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../../lib');
var logLine = require('../../../../__lib/util').log;
var log = require('../../../../__lib/util').tree;

var a = 0;

//--------------------------------------------
// A crazy example of Tas
//--------------------------------------------
// Tas can be nested calls, and mix many sync tasks
// and async tasks. This example shows the power of Tas.

// Please note the order in which the tasks are executed.
// This helps to deepen your understanding of the
// asynchronous execution mode in JavaScript.

//--------------------------------------------
// PLEASE DO NOT IMITATE THIS EXAMPLE
//--------------------------------------------
// However, this example is NOT a good example
// because we should not nest so many levels.

// If the nested level is too deep,
// the logic of the module will not be clear.

// It is advisable to design the sequence of
// tasks reasonably to avoid deep nesting.
//--------------------------------------------

var layer = function(){
	return tas.layer;
};

// Use setTimeout to represent asynchronous tasks, such as
// setTimeout, ajax, XMLHttpRequest, fs.readFile, etc.
tas.await({
	t1: function(){
		a ++; // 1
		log(layer(), 't1');

		tas.await({
			t2: function(){
				a ++; // 2
				log(layer(), 't2');

				tas.await({
					t3: function(){
						a ++; // 3
						log(layer(), 't3');

						//log(layer(), 'wait 0.5 seconds...', 1);
						//setTimeout(function(){
						//	a ++; // 4
						//
						//	log(tas.maxLayer, 'continue...', 1);
						//	tas.next();
						//
						//}, 500);
						tas.next();
					},

					t4: function(){
						a ++; // 5
						log(layer(), 't4');
						debugger;
						tas.next();
					}
				});

				tas({
					t5: function(){
						a ++; // 6
						log(layer(), 't5');

						tas({
							t6: function(){
								a ++; // 7
								log(layer(), 't6');
							},

							t7: function(){
								a ++; // 8
								log(layer(), 't7');
							}
						});

					},

					t8: function(){
						a ++; // 9
						log(layer(), 't8');
					}
				});

				tas({
					t9: function(){
						a ++; // 10
						log(layer(), 't9');
					}
				});
			},

			t10: function(){
				a ++; // 11
				log(layer(), 't10');
				tas.next();
			},

			t11: function(){
				a ++; // 12
				log(layer(), 't11');
				tas.next();
			}
		});

		tas({
			t12: function(){
				a ++; // 13
				log(layer(), 't12');
			},

			t13: function(){
				a ++; // 14
				log(layer(), 't13');

				tas({
					t14: function(){
						a ++; // 15
						log(layer(), 't14');
					},

					t15: function(){
						a ++; // 16
						log(layer(), 't15');
					}
				});
			},

			t16: function(){
				a ++; // 17
				log(layer(), 't16');
			}
		});

		tas({
			t17: function(){
				a ++; // 18
				log(layer(), 't17');
			}
		});
	},

	t18: function(){
		a ++; // 19
		log(layer(), 't18');
		tas.next();
	}
});

tas(function(){
	a ++; // 20
	debugger;
	log(layer(), 't20');
});

tas({
	t30: function(){
		a ++; // 21
		log(layer(), 't30');

		tas({
			t31: function () {
				a ++; // 22
				log(layer(), 't31');

				tas({
					t32: function(){
						a ++; // 23
						log(layer(), 't32');

						tas({
							t33: function(){
								a ++; // 24
								log(layer(), 't33');
							},

							t34: function(){
								a ++; // 25
								log(layer(), 't34');
							}
						});
					},

					t35: function(){
						a ++; // 26
						log(layer(), 't35');
					}
				});
			}
		});

		tas({
			t36: function(){
				a ++; // 27
				log(layer(), 't36');

				tas({
					t37: function(){
						a ++; // 28
						log(layer(), 't37');
					},

					t38: function(){
						a ++; // 29
						log(layer(), 't38');
					}
				});
			}
		});

		tas({
			t39: function(){
				a ++; // 30
				log(layer(), 't39');
			}
		});

	}
});

tas(function(){
	a ++; // 31
	log(layer(), 't40');
});

tas.await({
	t50: function(){
		a ++; // 32
		log(layer(), 't50');

		log(layer(), 'wait 0.5 seconds...', 1);
		setTimeout(function(){
			a ++; // 33

			log(tas.maxLayer, 'continue...', 1);
			tas.next();

		}, 500);
	},

	t51: function(){
		a ++; // 34
		log(layer(), 't51');
		tas.next();
	}
});

tas(function(){
	a ++; // 35
	log(layer(), 't60');
});

tas.await({
	t70: function(){
		a ++; // 36
		log(layer(), 't70');

		tas.await({
			t71: function(){
				a ++; // 37
				log(layer(), 't71');

				tas.await({
					t72: function(){
						a ++; // 38
						log(layer(), 't72');

						log(layer(), 'wait 0.5 seconds...', 1);
						setTimeout(function(){
							a ++; // 39

							log(tas.maxLayer, 'continue...', 1);
							tas.next();

						}, 500);
					}
				});

				tas(function(){
					a ++; // 40
					log(layer(), 't73');
				});

				tas.await({
					t74: function(){
						a ++; // 41
						log(layer(), 't74');

						log(layer(), 'wait 0.5 seconds...', 1);
						setTimeout(function(){
							a ++; // 42

							log(tas.maxLayer, 'continue...', 1);
							tas.next();

						}, 500);
					},

					t75: function(){
						a ++; // 43
						log(layer(), 't75');
						tas.next();
					}
				});

				tas(function(){
					a ++; // 44
					log(layer(), 't76');
				});

				tas.await({
					t77: function(){
						a ++; // 45
						log(layer(), 't77');

						log(layer(), 'wait 0.5 seconds...', 1);
						setTimeout(function(){
							a ++; // 46

							log(tas.maxLayer, 'continue...', 1);
							tas.next();

						}, 500);
					},

					t78: function(){
						a ++; // 47
						log(layer(), 't78');
						tas.next();
					}
				});
			},

			t79: function(){
				a ++; // 48
				log(layer(), 't79');
				tas.next();
			}
		});

		tas(function(){
			a ++; // 49
			log(layer(), 't80');
		});
	},

	t1: function(){
		a ++; // 50
		log(layer(), 't90');
		tas.next();
	}
});

tas({
	t100: function(){
		a ++; // 51
		log(layer(), 't100');
	}
});

tas(function(){
	logLine(a); // 51
});

module.exports = {
	get: function(){
		return a; // 51
	}
};
