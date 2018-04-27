function QueueRunner(someFunc) {
    this.queue = []; //Stores objects in the form of { data: <any>, onFinish: <someFunc> }
    this.handler = someFunc; //A function for processing
    this.pause = false; //A pause flag
    this.lastOnFinishFunc = function() {};
}

QueueRunner.prototype.push = function (obj) {
	this.queue.push(obj);
	let elem = Object.values(this.queue[0]);
    if(!this.pause) {
        this.handler(elem[0], elem[1]);
    } else {
        this.lastOnFinishFunc = elem[1];
    }
    if(this.queue.length > 1) {
    	this.queue.shift();
    }
};

QueueRunner.prototype.pause = function () {
	this.pause = true;
};

QueueRunner.prototype.resume = function () {
	this.pause = false;
};

QueueRunner.prototype.cleanup = function () {
    console.log("CANCELLED error");
    this.lastOnFinishFunc();
};
