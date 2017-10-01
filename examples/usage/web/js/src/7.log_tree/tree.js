/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tasTree = function(){

	var log = tas.tree.log;
	var a = 0;

	tas(function(){

		// Enable printing log tree in this module.
		tas.enableTree();
	});

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

				log('t33');
				log('continue...');

				tas.next();
			}, 500);
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

	tas(function(){

		// Disable printing log tree to avoid affect the other modules.
		tas.disableTree();
	});

	return {
		get: function(){
			return a; // 51
		}
	};

}();