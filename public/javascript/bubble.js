var bubbleObj = function () {
	this.ox = [];
	this.oy = [];
	this.or = [];
	this.al = 1;
	this.rate = [];
}

bubbleObj.prototype.num = 10;

bubbleObj.prototype.init = function () {
	this.al = 1;
	for (var i = 0; i < this.num; i ++) {
		this.rate[i] = Math.random()*2-1;
		this.ox[i] = mx + this.rate[i]*500*Math.random();
		this.oy[i] = my + this.rate[i]*800*Math.random();
		this.or[i] = 8*Math.random() + 1;
	}
	

	// pctx.beginPath();
	// pctx.moveTo(this.ox, this.oy);
	// pctx.lineTo(0, 0);
	// pctx.lineWidth = 2;
	// pctx.strokeStyle = '#fff';
	// pctx.stroke();
}

bubbleObj.prototype.draw = function () {
	this.al -= 0.003;
	pctx.save();
	if (this.al > 0) {
		for (var i = 0; i < this.num; i ++) {
			var rfill = 'rgba(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ',' + this.al +')';
			this.ox[i] += this.rate[i]*deltaTime * Math.random()*0.1;
			this.oy[i] += this.rate[i]*deltaTime * Math.random()*0.1;
			this.or[i] += Math.random()*0.1;
			if (this.or[i] > 30) {
				this.or[i] = 30;
			}
			pctx.beginPath();
			pctx.arc(this.ox[i], this.oy[i], this.or[i], 0, Math.PI*2, true);
			pctx.closePath();
			pctx.fillStyle = rfill;
			pctx.fill();
		}
	}
	else {
		window.cancelAnimationFrame(animate);
	}
	pctx.restore();
}