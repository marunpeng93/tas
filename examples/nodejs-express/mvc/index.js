/**
 * Examples of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/hiowenluke/tas
 * Released under the MIT License.
 */

(function(){arguments[0](
	require('../../lib')
)})

(function (tas) {

	var express = require('express');
	var logger = require('morgan');
	var path = require('path');
	var session = require('express-session');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');

	var app = module.exports = express();
	var tas = require('tas');

	tas({
		loadControllers: function(){
			require('./lib/boot')(app, { verbose: !module.parent });
		},

		doSettings: {
			setView: function(){
				app.set('view engine', 'jade');
			},

			setLog: function(){
				if (!module.parent) app.use(logger('dev'));
			},

			setPublic: function(){
				app.use(express.static(path.join(__dirname, 'public')));
			},

			setSession: function(){
				app.use(session({
					resave: false,
					saveUninitialized: false,
					secret: 'some secret here'
				}));
			},

			setParseBody: function(){
				app.use(bodyParser.urlencoded({ extended: true }));
			},

			setOverrideQuery: function(){
				app.use(methodOverride('_method'));
			}
		},

		setForError: {
			setViews: function(){
				app.set('views', path.join(__dirname, 'views'));
			},

			assumePages: function(){
				app.use(function(err, req, res, next){
					if (!module.parent) console.error(err.stack);
					res.status(500).render('5xx');
				});

				app.use(function(req, res, next){
					res.status(404).render('404', { url: req.originalUrl });
				});
			}
		},

		setMessage: {
			forResponse: function(){
				app.response.message = function(msg){
					var sess = this.req.session;
					sess.messages = sess.messages || [];
					sess.messages.push(msg);
					return this;
				};
			},

			forLocal: function(){
				app.use(function(req, res, next){
					var msgs = req.session.messages || [];
					res.locals.messages = msgs;
					res.locals.hasMessages = !! msgs.length;
					next();

					req.session.messages = [];
				});
			}
		},

		run: function(){
			if (!module.parent) {
				app.listen(3000);
				console.log('Express started on port 3000');
			}
		}
	});

});