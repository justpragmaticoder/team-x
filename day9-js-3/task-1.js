function QueueRunner(someFunc) {
    let queue = []; //Stores objects in the form of { data: <any>, onFinish: <someFunc> }
    let pause = false; //A pause flag

    function processFunc() {
        if(!pause && queue.length > 0) {
            const elem = queue.shift();
            someFunc(elem.data, elem.onFinish);
        }
    }

    return {
        push: (userData, onFinishFunc) => {
            queue.push({data: userData, onFinish: onFinishFunc});
            processFunc();
        },
        pause: () => {
            pause = true;
        },
        resume: () => {
            pause = false;
            processFunc();
        },
        cleanup: () => {
            console.log("CANCELLED error");
            if(queue.length > 0) {
                const elem = queue.shift();
                elem.onFinish();
            }
            queue.length = 0;
        }
    }

}

//Very simple test
let qr = QueueRunner((data, onFinish) => {
    console.log(data);
    onFinish();
});

qr.push({name: 'Vasya', age: '22'}, () => {
    console.log('Done!');
});

qr.pause();

qr.push({name: 'Petya', age: '23'}, () => {
    console.log('Done!');
});

qr.push({name: 'Ivan', age: '25'}, () => {
    console.log('Done!');
});

qr.cleanup();

qr.resume();
