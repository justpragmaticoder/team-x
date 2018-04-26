function QueueRunner(someFunc) {
    this.queue = []; //Stores objects in the form of { data: <any>, onFinish: <someFunc> }
    this.handler = someFunc; //A function for processing
    this.pause = false; //A pause flag
    this.cleanup = false; //A cleanup flag
    
    if(this.queue.length != 0) {
    	let elem = Object.values(this.queue[0]);
    	if(!this.pause && !this.cleanup) {
    		for(key in elem[0]) {
    			this.handler(key, elem[1]);
    		}
    	}
    	if(!this.cleanup) {
    		throw "CANCELLED error";
    		this.queue.length = 0;
    		return elem[1];
    	}
    }
}

QueueRunner.prototype.push = function (obj) {
	this.queue.push(obj);
};

QueueRunner.prototype.pause = function () {
	this.pause = true;
};

QueueRunner.prototype.resume = function () {
	this.pause = false;
};

QueueRunner.prototype.cleanup = function () {
	this.cleanup = true;
};
