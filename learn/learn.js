class Algorithm {
    constructor(algo, runningStatus){
        this.algo = algo;
        this.runningStatus = runningStatus;
    }
}
let bubble = new Algorithm(() => {
    console.log("works");
}, false);

bubble.algo();

//=======================
//=======================
class Rectangle {
    constructor(){
        console.log("the rectangle is being created");
    }
}

let box = new Rectangle();