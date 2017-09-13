/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib').load('tree');
var log = tas.tree.log;

var tester = require('../../__lib/tester');
var expect = require('chai').expect;

var r1 = [];

describe('6.extensions: tree', function(){
	it('should create tree logs', function(done){

		tas.tree.enable();
		tas.tree.logArray.begin();

		var test = function(done, count) {

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
							if (count === 1) {
								log('...');
							}

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

			tas(function (){
				done(count, tas.tree.logArray.getStr());
			});
		};

		var check = function(results){
			expect(results[1] === r1.join('\n')).to.be.equal(true);
			tas.tree.disable();
			tas.tree.log('this line will not be shown.');
			done();
		};

		tester.do(test, check);
	});
});

r1 = [
	' 1| t0',
	' 2|     wait...',
	' 2|     continue...',
	' 1| t1',
	' 2|     ...',
	' 2|     t2',
	' 3|         ...',
	' 3|         t21',
	' 4|             ...',
	' 3|         t22',
	' 4|             wait...',
	' 4|             continue...',
	' 3|         t23',
	' 4|             ...',
	' 2|     t3',
	' 3|         t31',
	' 4|             ...',
	' 3|         t32',
	' 4|             ...',
	' 4|             t321',
	' 5|                 ...',
	' 4|             t322',
	' 5|                 ...',
	' 4|             t323',
	' 5|                 ...',
	' 3|         t33',
	' 4|             ...',
	' 2|     t4',
	' 3|         t41',
	' 4|             ...',
	' 4|             t411',
	' 5|                 wait...',
	' 5|                 continue...',
	' 4|             t412',
	' 5|                 ...',
	' 4|             t413',
	' 5|                 wait...',
	' 5|                 continue...',
	' 3|         t42',
	' 4|             ...',
	' 4|             t421',
	' 5|                 wait...',
	' 5|                 continue...',
	' 4|             t422',
	' 5|                 ...',
	' 3|         t43',
	' 4|             ...',
	' 3|         t44',
	' 4|             ...',
	' 2|     t5',
	' 3|         ...',
	' 3|         t51',
	' 4|             ...',
	' 3|         t52',
	' 4|             ...',
	' 3|         t53',
	' 4|             wait...',
	' 4|             continue...',
	' 2|     t6',
	' 3|         ...',
	' 2|     t7',
	' 3|         ...',
	' 1| t8',
	' 2|     ...',
	' 1| t9',
	' 2|     wait...',
	' 2|     continue...',
	' 1| t10',
	' 2|     ...',
	' 1| t0',
	' 2|     wait...',
	' 2|     continue...',
	' 1| t1',
	' 2|     ...',
	' 2|     t2',
	' 3|         t21',
	' 4|             ...',
	' 3|         t22',
	' 4|             wait...',
	' 4|             continue...',
	' 3|         t23',
	' 4|             ...',
	' 2|     t3',
	' 3|         t31',
	' 4|             ...',
	' 3|         t32',
	' 4|             ...',
	' 4|             t321',
	' 5|                 ...',
	' 4|             t322',
	' 5|                 ...',
	' 4|             t323',
	' 5|                 ...',
	' 3|         t33',
	' 4|             ...',
	' 2|     t4',
	' 3|         t41',
	' 4|             ...',
	' 4|             t411',
	' 5|                 wait...',
	' 5|                 continue...',
	' 4|             t412',
	' 5|                 ...',
	' 4|             t413',
	' 5|                 wait...',
	' 5|                 continue...',
	' 3|         t42',
	' 4|             ...',
	' 4|             t421',
	' 5|                 wait...',
	' 5|                 continue...',
	' 4|             t422',
	' 5|                 ...',
	' 3|         t43',
	' 4|             ...',
	' 3|         t44',
	' 4|             ...',
	' 2|     t5',
	' 3|         ...',
	' 3|         t51',
	' 4|             ...',
	' 3|         t52',
	' 4|             ...',
	' 3|         t53',
	' 4|             wait...',
	' 4|             continue...',
	' 2|     t6',
	' 3|         ...',
	' 2|     t7',
	' 3|         ...',
	' 1| t8',
	' 2|     ...',
	' 1| t9',
	' 2|     wait...',
	' 2|     continue...',
	' 1| t10',
	' 2|     ...'
];
