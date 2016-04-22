var paintF;
var pctx;

//设置canvas宽高
var mWidth = $(window).width();
var mHeight = $(window).height();

//time
var lastTime;
var deltaTime;

//mouse location
var mx;
var my;

var pcl;
var pct;

var bubble;

var flag;

var rcolor;

$(function () {
	initPaint();
});

function initPaint () {
	paintF = $('#canvas01');
	pctx = $(paintF)[0].getContext('2d');

	$(paintF).attr('width', mWidth-100);
	$(paintF).attr('height', mHeight-100);
	bubble = new bubbleObj;
	$(paintF).on('click', onMouseDown);
	
}

function paintloop () {
	window.animFranme(paintloop);
	var nowTime = Date.now();
	deltaTime = nowTime - lastTime;
	lastTime = nowTime;
	pctx.clearRect(0, 0, mWidth, mHeight);
	bubble.draw();
}

function onMouseDown (e) {
	lastTime = Date.now();
	pct = $(paintF)[0].offsetTop;
	pcl = $(paintF)[0].offsetLeft;
	mx = e.clientX - pcl;
	my = e.clientY - pct;
	rcolor = randomColor();
	bubble.init();
	paintloop();
}

window.animFranme = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || window.oRequsetAnimationFrame || 
		window.msRequestAnimationFrame || 
		function (callback, element) {
			return window.setTimeout(callback, 1000/60);
		};
})();

function randomColor () {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	return {'r': col[0], 'g': col[1], 'b': col[2]};
}