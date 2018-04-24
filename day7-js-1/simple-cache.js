var cache = {
	limit : 100, //Cache size limit
	stack: {}, //Cache stack
	get: function(id){ //Gets cache if found
		return (typeof(this.stack[id]) != 'undefined') ? this.stack[id] : false;
	},
	set: function(data,id){ //Sets new data (key/value couple)
        	if(Object.keys(this.stack).length < 100) {
		    this.stack[id] = data
        	}
	},
	remove: function(id){//Removes cache for identifier
		if(typeof(this.stack[id]) != 'undefined')
			delete this.stack[id];
	},
};
