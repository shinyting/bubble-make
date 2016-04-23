var grassObj = function () {
	this.x = [];
	this.y = [];
	this.tall = [];
	this.thin = [];
}

grassObj.prototype.num = 100;

grassObj.prototype.init = function () {
	var count = 0;
	for (var i = 0; i < this.num; i ++) {
		this.tall[i] = 100 + Math.random()*30;
		this.x[i] = 20*count + Math.random()*20;
		this.y[i] = mHeight - this.tall[i];
		this.thin[i] = Math.random()*5 + 5;
		count ++;
	}
}

grassObj.prototype.draw = function () {
	psctx.strokeStyle = "#018a52";
	psctx.lineCap = "round";
	for (var i = 0; i < this.num; i ++) {
		if (this.tall[i] > 100) {
			this.tall[i] = 100;
		}
		if (this.tall[i] < 0) {
			this.tall[i] = 10;
		}
		this.tall[i] += deltaTime*0.1*(Math.random()*2-1);
		this.y[i] = mHeight - this.tall[i];
		this.x[i] += (Math.random()*2-1)*0.01;
		psctx.beginPath();
		psctx.lineWidth = this.thin[i];
		psctx.moveTo(this.x[i], this.y[i]);
		psctx.lineTo(this.x[i], mHeight);
		psctx.stroke();
	}
}