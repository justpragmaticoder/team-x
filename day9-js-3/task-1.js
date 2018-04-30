function QueueRunner(someFunc) {
    let queue = []; //Stores objects in the form of { data: <any>, onFinish: <someFunc> }
    let pause = false; //A pause flag;
    let inProgress = false;

    function processFunc() {
        if (!pause && queue.length > 0) {
            const elem = queue.shift();
            someFunc(elem.data, () => {
                elem.onFinish();
                if (queue.length > 0) processFunc();
                inProgress = false;
            });
        }
    }

    return {
        push: (userData) => {
            queue.push({data: userData.data, onFinish: userData.onFinish});
            if (!inProgress) {
                inProgress = true;
                processFunc();
            }
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
            if (queue.length > 0) {
                const elem = queue.shift();
                elem.onFinish();
            }
            queue.length = 0;
        }
    }
}

//Test
var q = QueueRunner((data, onFinish) => {

    setTimeout(() => {
        console.log(data.id, data.name);
        onFinish();
    }, data.timeout)
});

var onFinish = (name) => {
    return () => console.log('Finished: ' + name);
};

console.log('start');

q.push({data: {id: 1, name: 'Text 1', timeout: 2000}, onFinish: onFinish('Text1')});

q.push({data: {id: 2, name: 'Text 2', timeout: 3000}, onFinish: onFinish('Text2')});

q.push({data: {id: 3, name: 'Text 3', timeout: 500}, onFinish: onFinish('Text3')});

q.push({data: {id: 4, name: 'Text 4', timeout: 1500}, onFinish: onFinish('Text4')});

console.log('Finished');
