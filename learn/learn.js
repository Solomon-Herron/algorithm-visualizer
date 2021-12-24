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

//========================
//========================
let high = 9;

changeElementColor(high, "red", true );

async function changeElementColor(element, color, hasAnimation, animSpeedMagnifier){
    console.log(high);
    if(hasAnimation){
       console.log(animSpeedMagnifier);
    }
}