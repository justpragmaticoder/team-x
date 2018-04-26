function QueueRunner(someFunc) {
    this.queue = []; //Stores objects in the form of { data: <any>, onFinish: <someFunc> }
    this.handler = someFunc; //A function for processing
    this.pause = false; //A pause flag
    this.resume = false; //A resume flag
    this.lastOnFinish; //An onFinish function of the pending items
    
    if(this.queue.length != 0) {
    	for(let i = 0; i < this.queue.length; i++) {
    		let elem = Object.values(this.queue[i]);
    		if(!this.pause && !this.resume) {
    			for(key in elem[0]) {
    				this.handler(key, elem[1]);
    			}
    			continue;
    		}
    		this.lastOnFinish = elem[1];
    		break;
    	}
    }
    if(!this.resume) {
    	throw "CANCELLED error";
    	return this.lastOnFinish;
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
	this.resume = true;
};

QueueRunner.prototype.cleanup = function () {
	this.queue.length = 0;
};