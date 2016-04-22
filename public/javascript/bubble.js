var bubbleObj = function () {
	this.ox = [];
	this.oy = [];
	this.or = [];
	this.al = [];
	this.rate = [];
}

bubbleObj.prototype.num = 10;

bubbleObj.prototype.init = function () {
	for (var i = 0; i < this.num; i ++) {
		this.rate[i] = Math.random()*2-1;
		this.ox[i] = mx + this.rate[i]*500*Math.random();
		this.oy[i] = my + this.rate[i]*800*Math.random();
		this.or[i] = 8;
		this.al[i] = 1;
	}
	

	// pctx.beginPath();
	// pctx.moveTo(this.ox, this.oy);
	// pctx.lineTo(0, 0);
	// pctx.lineWidth = 2;
	// pctx.strokeStyle = '#fff';
	// pctx.stroke();
}

bubbleObj.prototype.draw = function () {
	pctx.save();
	for (var i = 0; i < this.num; i ++) {
		this.al[i] -= 0.005;
		var rfill = 'rgba(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ',' + this.al[i] +')';
		this.ox[i] += this.rate[i]*deltaTime * 0.008;
		this.oy[i] += this.rate[i]*deltaTime * 0.005;
		this.or[i] += Math.random();
		pctx.beginPath();
		pctx.arc(this.ox[i], this.oy[i], this.or[i], 0, Math.PI*2, true);
		pctx.closePath();
		pctx.fillStyle = rfill;
		pctx.fill();
	}
	pctx.restore();
}