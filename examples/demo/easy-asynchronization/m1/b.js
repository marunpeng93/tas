/**
 * Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../../lib').load('tree');
var log = tas.tree.log;

tas.tree.enable();
// tas.tree.disableLog();

tas.await(function t0(){
	log('wait...');
	setTimeout(function(){
		log('continue...');
		tas.next();
	}, 0);
});

tas({
	t1: function(){
		log('...');

		tas({
			t2: function(){
				log('...');

				tas(function t21(){
					log('...');
				});

				tas.await(function t22(){
					log('wait...');
					setTimeout(function(){
						log('continue...');
						tas.next();
					}, 0);
				});

				tas(function t23(){
					log('...');
				});
			},

			t3: {
				t31: function(){
					log('...');
				},

				t32: function(){
					log('...');

					tas({
						t321: function(){
							log('...');
						},

						t322: function(){
							log('...');
						},

						t323: function(){
							log('...');
						}
					});
				},

				t33: function(){
					log('...');
				}
			},

			t4: function(){
				tas.await({
					t41: function(){
						log('...');

						tas({
							t411: function(){
								log('wait...');
								setTimeout(function(){
									log('continue...');
									tas.next();
								}, 0);
								return 'await';
							},

							t412: function(){
								log('...');
							}
						});

						tas(function t413(){
							log('wait...');
							setTimeout(function(){
								log('continue...');
								tas.next();
							}, 0);

							return 'await';
						})
					},

					t42: function(){
						log('...');

						tas.await({
							t421: function(){
								log('wait...');
								setTimeout(function(){
									log('continue...');
									tas.next();
								}, 0);
							},

							t422: function(){
								log('...');
								tas.next();
							}
						});
					}
				});

				tas({
					t43: function(){
						log('...');
					},

					t44: function(){
						log('...');
					}
				});
			}
		});

		tas({
			t5: function(){
				log('...');

				tas({
					t51: function(){
						log('...');
					},

					t52: function(){
						log('...');
					}
				});

				tas.await(function t53(){
					log('wait...');
					setTimeout(function(){
						log('continue...');
						tas.next();
					}, 0);
				});

				return 'await';
			},

			t6: function(){
				log('...');
			},

			t7: function(){
				log('...');
			}
		});
	},

	t8: function(){
		log('...');
	}
});

tas.await(function t9(){
	log('wait...');
	setTimeout(function(){
		log('continue...');
		tas.next();
	}, 0);
});

tas(function t10(){
	log('...');
});
