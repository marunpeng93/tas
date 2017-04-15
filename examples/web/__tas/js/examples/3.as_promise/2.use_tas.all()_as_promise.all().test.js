/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

tas(function(){

    var test = tester.test;
    var runner = useTasAllAsPromiseAll;

    var exp = 'array';
    var val = runner.get() instanceof Array ? 'array' : '';
    test("3.as promise: use tas.all() as promise.all()", tas, exp, val);
});
