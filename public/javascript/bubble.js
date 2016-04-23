var bubbleObj = function () {
	this.ox = [];
	this.oy = [];
	this.or = [];
	this.al = 1;
	this.rate = [];
}

bubbleObj.prototype.num = 30;

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
	this.al -= 0.005;
	pctx.save();
	pctx.lineWidth = 1;
	if (this.al > 0) {
		for (var i = 0; i < this.num; i ++) {
			var rfill = 'rgba(' + rcolor.r + ',' + rcolor.g + ',' + rcolor.b + ',' + this.al + ')';
			var sfill = 'rgba(' + scolor.r + ',' + scolor.g + ',' + scolor.b + ',' + this.al + ')';
			// if (this.ox[i] > mx) {
			// 	this.ox[i] += deltaTime * Math.random()*0.5;
			// }
			// else {
			// 	this.ox[i] -= deltaTime * Math.random()*0.5;
			// }
			// if (this.oy[i] > my) {
			// 	this.oy[i] += deltaTime * Math.random()*0.5;
			// }
			// else {
			// 	this.oy[i] -= deltaTime * Math.random()*0.5;
			// }
			this.ox[i] += this.rate[i]*deltaTime * Math.random()*3;
			this.oy[i] += this.rate[i]*deltaTime * Math.random()*2;
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