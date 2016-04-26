var db = require('./db.js');
var userCollection = db.collection('users');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cons = require('consolidate');
var io = require('socket.io')(80);
var moment = require('moment');

var User = require('./models/userModel.js');

var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.engine('html', cons.swig);
app.set('view engine', 'html');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var userArray = [];
io.on('connection', function (socket) {
	socket.emit('users', {users: userArray});
	socket.on('myMsg', function (data) {
		socket.broadcast.emit('showMsg', data);
	});

	socket.on('addUser', function (data) {
		if (userArray.indexOf(data.uname) > -1) {
			socket.emit('nameExisted');
		}
		else {
			//把用户信息保存在mongodb
			var userMongo = new User(
				{
					name: data.uname, 
					loginTime: moment().format('YYYY-MM-DD'),
					brands: [{logo: 'a', title: 'atext'}, {logo: 'b', title: 'btext'}, {logo: 'c', title: 'ctext'}]
				}
			);
			userMongo.save(function (err, user) {
				if (!err) {
					console.log('saved');
					//如果保存成功，把user表的所有内容查出来
					userCollection.find({}).toArray(function (err, result) {
						if (!err) {
							console.log(result);
						}
					});
				}
			});
			//用户信息保存在服务端处理
			socket.userIndex = userArray.length;
			socket.nickname = data.uname;
			userArray.push(data.uname);
			io.emit('showUser', {users: userArray, newone: data.uname});
		}
	});
	socket.on('disconnect', function () {
		if (userArray.length > 0) {
			userArray.splice(socket.userIndex, 1);
			socket.broadcast.emit('removeUser', {rname: socket.nickname, users: userArray});
		}
	});
});

app.use(function (req, res, next) {
	var err = new Error('not found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;