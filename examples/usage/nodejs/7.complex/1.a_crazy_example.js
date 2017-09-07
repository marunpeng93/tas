/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib').load('tree');
var log = tas.logTree;

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

// Use setTimeout to represent asynchronous tasks, such as
// setTimeout, ajax, XMLHttpRequest, fs.readFile, etc.

tas.await({
	t1: function(){
		a ++; // 1

		tas.await({
			t2: function(){
				a ++; // 2

				tas.await({
					t3: function(){
						a ++; // 3

						log('wait 0.5 seconds...');
						setTimeout(function(){
							a ++; // 4

							log('t4');
							log('continue...');

							debugger;
							tas.next();
						}, 500);

					},

					t5: function t5(){
						a ++; // 5
						tas.next();
					}
				});

				tas({
					t6: function(){
						a ++; // 6

						tas({
							t7: function(){
								a ++; // 7
							},

							t8: function(){
								a ++; // 8
							}
						});

					},

					t9: function(){
						a ++; // 9
					}
				});

				tas({
					t10: function(){
						a ++; // 10
					}
				});
			},

			t11: function(){
				a ++; // 11
				tas.next();
			},

			t12: function(){
				a ++; // 12
				tas.next();
			}
		});

		tas({
			t13: function(){
				a ++; // 13
			},

			t14: function(){
				a ++; // 14

				tas({
					t15: function(){
						a ++; // 15
					},

					t16: function(){
						a ++; // 16
					}
				});
			},

			t17: function(){
				a ++; // 17
			}
		});

		tas({
			t18: function(){
				a ++; // 18
			}
		});
	},

	t19: function(){
		a ++; // 19
		tas.next();
	}
});

tas(function t20(){
	a ++; // 20
});

tas({
	t21: function(){
		a ++; // 21

		tas({
			t22: function() {
				a ++; // 22

				tas({
					t23: function(){
						a ++; // 23

						tas({
							t24: function(){
								a ++; // 24
							},

							t25: function(){
								a ++; // 25
							}
						});
					},

					t26: function(){
						a ++; // 26
					}
				});
			}
		});

		tas({
			t27: function(){
				a ++; // 27

				tas({
					t28: function(){
						a ++; // 28
					},

					t29: function(){
						a ++; // 29
					}
				});
			}
		});

		tas({
			t30: function(){
				a ++; // 30
			}
		});

	}
});

tas(function t31(){
	a ++; // 31
});

tas.await({
	t32: function(){
		a ++; // 32

		log('wait 0.5 seconds...');
		setTimeout(function(){
			a ++; // 33

			debugger;
			log('t33');
			log('continue...');

			tas.next();
		}, 500);

		debugger;
	},

	t34: function(){
		a ++; // 34
		tas.next();
	}
});

tas(function t35(){
	a ++; // 35
});

tas.await({
	t36: function(){
		a ++; // 36

		tas.await({
			t37: function(){
				a ++; // 37

				tas.await({
					t38: function(){
						a ++; // 38

						log('wait 0.5 seconds...');
						setTimeout(function(){
							a ++; // 39

							log('t39');
							log('continue...');

							tas.next();
						}, 500);
					}
				});

				tas(function t40(){
					a ++; // 40
				});

				tas.await({
					t41: function(){
						a ++; // 41

						log('wait 0.5 seconds...');
						setTimeout(function(){
							a ++; // 42

							log('t42');
							log('continue...');

							tas.next();
						}, 500);
					},

					t43: function(){
						a ++; // 43
						tas.next();
					}
				});

				tas(function t44(){
					a ++; // 44
				});

				tas.await({
					t45: function(){
						a ++; // 45

						log('wait 0.5 seconds...');
						setTimeout(function(){
							a ++; // 46

							log('t46');
							log('continue...');

							tas.next();
						}, 500);
					},

					t47: function(){
						a ++; // 47
						tas.next();
					}
				});
			},

			t48: function(){
				a ++; // 48
				tas.next();
			}
		});

		tas(function t49(){
			a ++; // 49
		});
	},

	t50: function(){
		a ++; // 50
		tas.next();
	}
});

tas({
	t51: function(){
		a ++; // 51
	}
});

module.exports = {
	get: function(){
		return a; // 51
	}
};
