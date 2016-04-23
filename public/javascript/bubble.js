var bubbleObj = function () {
	this.ox = [];
	this.oy = [];
	this.or = [];
	this.al = 1;
	this.rate = [];
}

bubbleObj.prototype.num = 20;

bubbleObj.prototype.init = function () {
	this.al = 1;
	for (var i = 0; i < this.num; i ++) {
		this.rate[i] = Math.random()*2-1;
		this.ox[i] = mx + (Math.random()*2-1)*200;
		this.oy[i] = my + (Math.random()*2-1)*250;
		this.or[i] = 8*Math.random() + 1;
	}
}

bubbleObj.prototype.draw = function () {
	this.al -= 0.003;
	pctx.save();
	pctx.lineWidth = 1;
	if (this.al > 0) {
		for (var i = 0; i < this.num; i ++) {
			var rfill = 'rgba(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ',' + this.al + ')';
			var sfill = 'rgba(' + scolor.r + ',' + scolor.g + ',' + scolor.b + ',' + this.al + ')';
			this.ox[i] += this.rate[i]*deltaTime * Math.random();
			this.oy[i] += this.rate[i]*deltaTime * Math.random();
			this.or[i] += Math.random()*0.1;
			if (this.or[i] > 30) {
				this.or[i] = 30;
			}
			pctx.beginPath();
			pctx.arc(this.ox[i], this.oy[i], this.or[i], 0, Math.PI*2, true);
			pctx.closePath();
			pctx.fillStyle = rfill;
			pctx.fill();
			pctx.strokeStyle = sfill;
			pctx.stroke();
		}
	}
	else {
		window.cancelAnimationFrame(animate);
	}
	pctx.restore();
}