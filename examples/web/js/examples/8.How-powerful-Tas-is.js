/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

(function (tas, title, log, logs, tree) {

	tas(function(){
		title('8. How powerful Tas is');
	});

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
	// the logic of the module will be not clear.

	// It is advisable to design the task sequence
	// reasonably to avoid deep nesting.
	//--------------------------------------------

	var layer = function(){
		return tas.layer;
	}

	// Use setTimeout to represent asynchronous tasks, such as
	// setTimeout, ajax, XMLHttpRequest, fs.readFile, etc.
	tas.await({
		t1: function(){
			tree(layer(), 't1');

			tas.await({
				t2: function(){
					tree(layer(), 't2');

					tas.await({
						t3: function(){
							tree(layer(), 't3');

							tree(layer(), 'Wait 1 second...', 1);
							setTimeout(function(){

								tree(tas.maxLayer, 'Continue...', 1);
								tas.next();

							}, 1000);
						},

						t4: function(){
							tree(layer(), 't4');
							tas.next();
						}
					});

					tas({
						t5: function(){
							tree(layer(), 't5');

							tas({
								t6: function(){
									tree(layer(), 't6');
								},

								t7: function(){
									tree(layer(), 't7');
								}
							});

						},

						t8: function(){
							tree(layer(), 't8');
						}
					});

					tas({
						t9: function(){
							tree(layer(), 't9');
						}
					});
				},

				t10: function(){
					tree(layer(), 't10');
					tas.next();
				},

				t11: function(){
					tree(layer(), 't11');
					tas.next();
				}
			});

			tas({
				t12: function(){
					tree(layer(), 't12');
				},

				t13: function(){
					tree(layer(), 't13');

					tas({
						t14: function(){
							tree(layer(), 't14');
						},

						t15: function(){
							tree(layer(), 't15');
						}
					});
				},

				t16: function(){
					tree(layer(), 't16');
				}
			})

			tas({
				t17: function(){
					tree(layer(), 't17');
				}
			});
		},

		t18: function(){
			tree(layer(), 't18');
			tas.next();
		}
	});

	tas(function(){
		tree(layer(), 't20');
	});

	tas({
		t30: function(){
			tree(layer(), 't30');

			tas({
				t31: function () {
					tree(layer(), 't31');

					tas({
						t32: function(){
							tree(layer(), 't32');

							tas({
								t33: function(){
									tree(layer(), 't33');
								},

								t34: function(){
									tree(layer(), 't34');
								}
							});
						},

						t35: function(){
							tree(layer(), 't35');
						}
					});
				}
			});

			tas({
				t36: function(){
					tree(layer(), 't36');

					tas({
						t37: function(){
							tree(layer(), 't37');
						},

						t38: function(){
							tree(layer(), 't38');
						}
					});
				}
			});

			tas({
				t39: function(){
					tree(layer(), 't39');
				}
			});

		}
	});

	tas(function(){
		tree(layer(), 't40');
	});

	tas.await({
		t50: function(){
			tree(layer(), 't50');

			tree(layer(), 'Wait 1 second...', 1);
			setTimeout(function(){

				tree(tas.maxLayer, 'Continue...', 1);
				tas.next();

			}, 1000);
		},

		t51: function(){
			tree(layer(), 't51');
			tas.next();
		}
	});

	tas(function(){
		tree(layer(), 't60');
	});

	tas.await({
		t70: function(){
			tree(layer(), 't70');

			tas.await({
				t71: function(){
					tree(layer(), 't71');

					tas.await({
						t72: function(){
							tree(layer(), 't72');

							tree(layer(), 'Wait 1 second...', 1);
							setTimeout(function(){

								tree(tas.maxLayer, 'Continue...', 1);
								tas.next();

							}, 1000);
						}
					});

					tas(function(){
						tree(layer(), 't73');
					});

					tas.await({
						t74: function(){
							tree(layer(), 't74');

							tree(layer(), 'Wait 1 second...', 1);
							setTimeout(function(){

								tree(tas.maxLayer, 'Continue...', 1);
								tas.next();

							}, 1000);
						},

						t75: function(){
							tree(layer(), 't75');
							tas.next();
						}
					});

					tas(function(){
						tree(layer(), 't76');
					});

					tas.await({
						t77: function(){
							tree(layer(), 't77');

							tree(layer(), 'Wait 1 second...', 1);
							setTimeout(function(){

								tree(tas.maxLayer, 'Continue...', 1);
								tas.next();

							}, 1000);
						},

						t78: function(){
							tree(layer(), 't78');
							tas.next();
						}
					});
				},

				t79: function(){
					tree(layer(), 't79');
					tas.next();
				}
			});

			tas(function(){
				tree(layer(), 't80');
			});
		},

		t1: function(){
			tree(layer(), 't90');
			tas.next();
		}
	});

	tas({
		t100: function(){
			tree(layer(), 't100');
		}
	});

	tas(function(){
		log('Done\n');
	});

// The utils is only used for this example, not part of Tas.
})(tas, utils.title, utils.log, utils.logs, utils.tree);
