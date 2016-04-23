var paintF;
var pctx;
var paintS;
var psctx;

//设置canvas宽高
var mWidth = $(window).width() - 100;
var mHeight = $(window).height() - 100;

//time
var lastTime = Date.now();
var deltaTime;

//mouse location
var mx;
var my;

var pcl;
var pct;

var bubble;
var grass;

var flag;

var rcolor;

var animate;

$(function () {
	initPaint();

	var nickname;
	var socket = io.connect('http://127.0.0.1');
	
	//加入聊天室
	$('.setname').on('click', saveUser);
	$('.nickname').on('keydown', function (event) {
		if (event.which === 13) {
			saveUser();
		}
	})

	//发送消息
	$('.sendbtn').on('click', sendMsg);
	$('.mymsg').on('keydown', function (event) {
		if (event.which === 13) {
			sendMsg();
		}
	});

	//显示该聊天室中当前用户数
	socket.on('users', function (data) {
		$('.ucount').html(data.users.length);
	});

	//显示服务端返回的其他客户端发送的消息
	socket.on('showMsg', function (data) {
		var string = "<div class='clearfix'><p class='pull-left'><span class='blue'>" + data.user + ": </span>" + data.msg + "</p></div>";
		$('.chatbox').append(string);
	});

	//显示用户信息：当前在线人数，及新加入用户
	socket.on('showUser', function (data) {
		console.log(data.users);
		$('.ucount').html(data.users.length);
		var ustring = "<p class='text-center gray'>" + data.newone + "加入聊天</p>";
		$('.chatbox').append(ustring);
	});

	//用户名存在时的处理方法
	socket.on('nameExisted', function () {
		$('.rtip').removeClass('none');
		$('.mask').removeClass('none');
		$('.uname').addClass('none');
	});

	//显示用户离开的信息
	socket.on('removeUser', function (data) {
		console.log(data);
		var rustring = "<p class='text-center gray'>" + data.rname + "离开</p>";
		$('.chatbox').append(rustring);
		$('.ucount').html(data.users.length);
	});

	//发送信息的方法
	function sendMsg () {
		var mstring;
		var msg = $('.mymsg').val();
		mstring = "<div class='clearfix'><p class='pull-right'><span class='purple'>" + nickname + ":</span> " + msg + "</p></div>";
		$('.chatbox').append(mstring);
		console.log(msg);
		$('.mymsg').val('');
		socket.emit('myMsg', {msg: msg, user: nickname})
	}

	//保存用户名的方法
	function saveUser () {
		nickname = $('.nickname').val();
		$('.uname').removeClass('none');
		$('.uname').html(nickname);
		if (!nickname) {
			return;
		}
		socket.emit('addUser', {uname: nickname});
		$('.mask').addClass('none');
	}

});

function initPaint () {
	paintF = $('#canvas01');
	paintS = $('#canvas02');
	pctx = $(paintF)[0].getContext('2d');
	psctx = $(paintS)[0].getContext('2d');
	$(paintF).attr('width', mWidth);
	$(paintF).attr('height', mHeight);
	$(paintS).attr('width', mWidth);
	$(paintS).attr('height', mHeight);

	bubble = new bubbleObj;
	$(paintF).on('click', onMouseDown);

	grass = new grassObj;
	grass.init();

	paintGrass();
}

function paintloop () {
	animate = window.animFrame(paintloop);
	var nowTime = Date.now();
	deltaTime = nowTime - lastTime;
	lastTime = nowTime;
	pctx.clearRect(0, 0, mWidth, mHeight);
	bubble.draw();
}

function paintGrass () {
	animate = window.animFrame(paintGrass);
	var nowTime = Date.now();
	deltaTime = nowTime - lastTime;
	lastTime = nowTime;
	psctx.clearRect(0, 0, mWidth, mHeight);
	grass.draw();
}

function onMouseDown (e) {
	lastTime = Date.now();
	pct = $(paintF)[0].offsetTop;
	pcl = $(paintF)[0].offsetLeft;
	mx = e.clientX - pcl;
	my = e.clientY - pct;
	rcolor = randomColor();
	scolor = randomColor();
	bubble.init();
	paintloop();
}

window.animFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || window.oRequsetAnimationFrame || 
		window.msRequestAnimationFrame || 
		function (callback, element) {
			return window.setTimeout(callback, 1000/60);
		};
})();

function randomColor () {
	var col = [0, 1, 2];
	col[0] = Math.random() * 255;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 255;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 255;
	col[2] = col[2].toFixed();
	return {'r': col[0], 'g': col[1], 'b': col[2]};
}