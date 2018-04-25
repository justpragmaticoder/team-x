var cache = {
	limit : 100,
	stack: {}, //Cache stack
	dataObject : {
		storage: '', 
		freq: 0,
		set: function(storage) {
			this.storage = storage;
			return this;
		}
	},
	get: function(id){ //Gets cache if found
		if(typeof(this.stack[id].storage) != 'undefined') {
			this.stack[id].freq++;
			return this.stack[id].storage;
		}
		return false;
	},
	set: function(data,id){ //Sets new data (key/value couple)
        	if(Object.keys(this.stack).length < 100) {
            		this.stack[id] = new this.dataObject.set(data);
            	return;
        }
        //Looks for the key/value couple with the lowest frequency and replaces with a new couple
        	let leastFreq = Object.keys(this.stack)[0];
        	for(key in this.stack) {
        		if(key.freq < leastFreq) {
        			leastFreq = key.freq;
        		}
        	}
        	delete this.stack[leastFreq];
        	this.set(data,id);
	},
	remove: function(id){//Removes cache for identifier
		if(typeof(this.stack[id]) != 'undefined')
			delete this.stack[id];
	},
};
