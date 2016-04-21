var bubbleObj = function () {
	this.ox = [];
	this.oy = [];
	this.or = [];
	this.al = [];
}

bubbleObj.prototype.num = 10;

bubbleObj.prototype.init = function () {
	for (var i = 0; i < this.num; i ++) {
		this.ox[i] = mx;
		this.oy[i] = my;
		this.or[i] = 5;
		this.al[i] = 1;
		// pctx.save();
		// pctx.beginPath();
		// pctx.arc(this.ox[i], this.oy[i], this.or[i], 0, Math.PI*2, true);
		// // pctx.closePath();
		// pctx.fillStyle = 'rgb(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ')';
		// pctx.fill();
		// pctx.restore();
	}
	

	// pctx.beginPath();
	// pctx.moveTo(this.ox, this.oy);
	// pctx.lineTo(0, 0);
	// pctx.lineWidth = 2;
	// pctx.strokeStyle = '#fff';
	// pctx.stroke();
}

bubbleObj.prototype.draw = function () {
	for (var i = 0; i < this.num; i ++) {
		this.al[i] -= deltaTime*0.0001+0.001;
		var rfill = 'rgba(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ',' + this.al[i] +')';
		this.ox[i] += deltaTime * 0.03;
		this.oy[i] += deltaTime * 0.03;
		this.or[i] += deltaTime * 0.01;
		pctx.beginPath();
		pctx.arc(this.ox[i], this.oy[i], this.or[i], 0, Math.PI*2, true);
		pctx.closePath();
		pctx.fillStyle = rfill;
		pctx.fill();
	}
	
}