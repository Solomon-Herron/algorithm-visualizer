let stage = document.querySelector('#stage');
let newArraybtn = document.querySelector('#new-array');
newArraybtn.addEventListener("click", newArray);
let bubblesort = document.querySelector('#bubblesort-btn');
bubblesort.addEventListener("click", bubbleSort);
let selectionsort =  document.querySelector('#selectionsort-btn');
selectionsort.addEventListener("click", selectionSort);
let insertionsort =  document.querySelector('#insertionsort-btn');
insertionsort.addEventListener("click", insertionSort);
let quicksort = document.querySelector('#quicksort-btn');
quicksort.addEventListener("click", async () =>{
    if(!isRunning){
        document.querySelector('#yellowblck').style.display = 'flex';
        document.querySelector('#drkyellowblck').style.display = 'flex';
        document.querySelector('#greyblck').style.display = 'flex';
        document.querySelector('#redblck').style.display = 'flex';
        document.querySelector('#cyanblck').style.display = 'flex';
        let high = stage.childNodes.length - 1;
        await quickSort(0, high);
    } else{ 
        errormsg.style.opacity = '1';
        await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
        errormsg.style.opacity = '0';
        return;
    }
});

let slider = document.querySelector('#myRange');
let numOfBars = 50;
let speed = 100;
slider.addEventListener("mouseup", async ()=>{
    if(!isRunning){
        numOfBars = slider.value;
            speed = numOfBars < 25 ? 700 :
            numOfBars < 50 ? 500 : 
            numOfBars < 70 ? 80 : 20;
        newArray();
    } else {
        errormsg.style.opacity = '1';
        await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
        errormsg.style.opacity = '0';
        return;
        }
});

// slider.value = 50 then speed = 1;
// speed = ((slider.value) / 50) * 100; 

let errormsg = document.querySelector('#errormsg');
let isRunning = false;


// SORT FUNCTIONS
async function bubbleSort(){
    if(stage.children[0] === undefined){ return }
    if(isRunning) {
        errormsg.style.opacity = '1';
        await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
        errormsg.style.opacity = '0';
        return;
    }
    isRunning = true;
    document.querySelector('#yellowblck').style.display = 'flex';
    document.querySelector('#drkyellowblck').style.display = 'flex';
    document.querySelector('#greyblck').style.display = 'flex';
    document.querySelector('#redblck').style.display = 'flex';
    document.querySelector('#red-text').innerHTML = 'Larger element has been identified';
    let exampleindex = Math.floor(stage.childNodes.length / 2);
    stage.childNodes[2].style.height = '550px';
    stage.childNodes[9].style.height = '650px';   // These values are meant to illustrate the 'bubble' in a bubble sort
    stage.childNodes[exampleindex].style.height = '650px';
    let n = stage.childNodes.length;
    for (let i = 0; i < n-1; i++){  // for each array element
        for(let j = 0; j < n-i-1; j++){  //first run- wjole array,
            stage.childNodes[j].style.background = "var(--yellow)";
            if(parseInt(stage.childNodes[j].style.height) > parseInt(stage.childNodes[j + 1].style.height))
            {
                await new Promise(resolve => setTimeout(() => {resolve()}, speed));
                swap(stage.childNodes[j + 1], stage.childNodes[j]);
            } else { 
                await new Promise(resolve => setTimeout(() => {resolve()}, speed * 2));
                stage.childNodes[j + 1].style.background = "red";
                await new Promise(resolve => setTimeout(() => {resolve()}, speed * 2));
                stage.childNodes[j + 1].style.background = "var(---mint-green)";
                await new Promise(resolve => setTimeout(() => {resolve()}, speed * 2));
            }
            stage.childNodes[j].style.background = "var(---mint-green)";
            stage.childNodes[j + 1].style.background = "var(--light-grey)";
        }
        
    }
    stage.childNodes[0].style.background = "var(--light-grey)";
    isRunning = false;
}


async function selectionSort(){
    if(stage.children[0] === undefined){ return }
    if(isRunning) {
        errormsg.style.opacity = '1';
        await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
        errormsg.style.opacity = '0';
        return;
    }
    if(newArraybtn.addEventListener("click", () => true)){
        return;
    }
    isRunning = true;
    document.querySelector('#yellowblck').style.display = 'flex';
    document.querySelector('#drkyellowblck').style.display = 'flex';
    document.querySelector('#greyblck').style.display = 'flex';

    let sortedArr = [];
    let minIndex, i, k;
    for(i = 0; i < stage.childNodes.length - 1; i++){
        minIndex = i;
        for(k = i + 1; k < stage.childNodes.length; k++){
            if(parseInt(stage.childNodes[k].style.height) < parseInt(stage.childNodes[minIndex].style.height)){minIndex = k;} 
        }
        stage.childNodes[minIndex].style.background = "var(--yellow)";
        await new Promise(resolve => setTimeout(() => {resolve()}, speed * 3));
        swap(stage.childNodes[minIndex], stage.childNodes[i]);
        stage.childNodes[i].style.background = "var(--darkyellow)";
        await new Promise(resolve => setTimeout(() => {resolve()}, speed));
        for(let p = 0; p < i; p++){stage.childNodes[p].style.background = "var(--light-grey)";}
        stage.childNodes[minIndex].style.background = "var(---mint-green)";
       
    }
    stage.childNodes[stage.childNodes.length - 1].style.background = "var(--light-grey)";
    stage.childNodes[stage.childNodes.length - 2].style.background = "var(--light-grey)";
    isRunning = false;

}

async function insertionSort(){
    if(stage.children[0] === undefined){ return }
    if(isRunning) {
        errormsg.style.opacity = '1';
        await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
        errormsg.style.opacity = '0';
        return;
    }
    isRunning = true;
    document.querySelector('#yellowblck').style.display = 'flex';
    
    let i, key, k;
    for(i = 1; i < stage.childNodes.length; i++){
        key = parseInt(stage.childNodes[i].style.height);
        k = i - 1;
        while( k >= 0 && parseInt(stage.childNodes[k].style.height) > key)
        {
            stage.childNodes[k + 1].style.background = "var(--yellow)";
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            swap(stage.childNodes[k + 1], stage.childNodes[k])
            stage.childNodes[k + 1].style.background = "var(---mint-green)"; 
            k -= 1;
        }
        stage.childNodes[k + 1].style.height = key;
    }
    isRunning = false;
}

quickSort = async (low, high) => {
    if(stage.children[0] === undefined){ return }
    isRunning = true;
    if(low < high)
    {
        partitionIndex = await partition(low, high);
        await this.quickSort(low, partitionIndex -1);
        await this.quickSort(partitionIndex + 1, high);
    }
    isRunning = false;
}

async function partition(low, high){
    let pivot = parseInt(stage.childNodes[high].style.height);
    //  [0]or[?]            [n]=pivot
    let i = (low - 1);
    
    for( let j = low; j <= high -1; j++){
        //on each pass, a section of the array is traversed,
        //any element shorter in height than pivot (on first pass this is [n-1])
        //is moved to the beginning of the array.
        stage.childNodes[high].style.background = "red";
        stage.childNodes[low].style.background = "#00FFF4"; //bright blue
        if(parseInt(stage.childNodes[j].style.height) < pivot){ 
            //for every element smaller than the pivot, i increases by 1   
            i++;
            stage.childNodes[j].style.background = "var(--yellow)"; //yellow
            await new Promise(resolve => setTimeout(() => {resolve()}, speed * 3));
            swap(stage.childNodes[i], stage.childNodes[j]);
            stage.childNodes[i].style.background = "var(--darkyellow)"; //greyellow
            await new Promise(resolve => setTimeout(() => {resolve()}, speed));
            stage.childNodes[i].style.background = "var(---mint-green)"; //gren
            stage.childNodes[j].style.background = "var(---mint-green)"; //yellow
        }
        stage.childNodes[high].style.background = "var(---mint-green)"; //green
        stage.childNodes[low].style.background = "var(---mint-green)"; //bright blue


    }
    await new Promise(resolve => setTimeout(() => {resolve()}, speed * 3));
    swap(stage.childNodes[i + 1], stage.childNodes[high]);
    // stage.childNodes[i + 1].style.background = "#793434";
    // await new Promise(resolve => setTimeout(() => {resolve()}, 100));
    // stage.childNodes[i + 1].style.background = "var(--light-grey)";

    return (i + 1);

}



function swap(el1, el2){
    //el1 = smaller div
    //el2 = larger div
    let style1 = window.getComputedStyle(el1);
    let style2 = window.getComputedStyle(el2);

    let transform1 = style1.getPropertyValue("height");
    let transform2 = style2.getPropertyValue("height");

    el1.style.height = transform2;
    el2.style.height = transform1;
}


function newArray(){
    document.querySelector('#yellowblck').style.display = 'none';
    document.querySelector('#drkyellowblck').style.display = 'none';
    document.querySelector('#greyblck').style.display = 'none';
    document.querySelector('#redblck').style.display = 'none';
    document.querySelector('#cyanblck').style.display = 'none';
    while(stage.firstChild){
        stage.removeChild(stage.firstChild);
    }
    let newbar = document.createElement('DIV');
    for(let i = 0; i <= numOfBars; i++){
        let newbar = document.createElement('DIV');
        // let allBars = stage.childNodes;
        // let size = allBars.length;
        newbar.style.width = numOfBars < 15 ? '5%' : 
                             numOfBars <= 25 ? '2%' : 
                             numOfBars <= 50 ? '1%' :
                             numOfBars <= 75 ? '.08%' : '.05%'; 
        newbar.style.height = (Math.floor((Math.random() * 400) + 1)) + 'px';
        newbar.classList.add('bar');
        stage.appendChild(newbar);
    }
}

function adjustArray(){
    //for slider

}

// BROKEN, I SUCK AND ANIMATION

// function deleteArrayFadeOut(newArray){
    // let numNodes = stage.childNodes.length;
    // if(numNodes < 25){
    //     deleteTimer = numNodes * 100;
    //     fadeTimer = 99;
    // } else if(numNodes > 25 && numNodes < 50) {
    //     deleteTimer = numNodes * 50;
    //     fadeTimer = 49;
    // } else if(numNodes > 50 && numNodes < 75){
    //     deleteTimer = numNodes * 6;
    //     fadeTimer = 24;
    // } else if(numNodes > 75){
    //     deleteTimer = numNodes * 6;
    //     fadeTimer = 5;
    // }
    // for(let i = 0; i < stage.childNodes.length; i++){ 
    //     if(stage.childNodes[i].nodeName == 'DIV'){
    //         setTimeout(function() { 
    //             stage.childNodes[i].classList.add('remove');
    //         }, i * fadeTimer ); //summation cannot be greater that set timer 
    //     }
    // }
    // setTimeout(function (){
    //     while(stage.firstChild){
    //         stage.removeChild(stage.firstChild);
    //     }}, deleteTimer);
  //  newArray;        
// }
/*
(globals)
let size;
let array = [];
let newbarArray = [];
bar = document.createElement('DIV');

getarraySize(){
    let slider = document.querySelector('#myRange')
    slider.addEventListener("mouseup", ()=>{
        size = slider.value;
    })
    int array[size];

}
create an array in which each index holds a random number from 1 to 500;
getArray(){
    int array[size]
    for(int i = 0; i <= array.length; i++){
       array.push(math.floor(Math.random(somethingsomething * 500));)
    }
    return array;
}

addEl(size){
    let newbar = document.createElement('DIV');
    for(let i = 0; i < array.length; i++){
        var newbar = document.createElement('DIV');
        newbar.style.width = size < 15 ? '5%' : 
                             size <= 25 ? '2%' : 
                             size <= 50 ? '1%' :
                             size <= 75 ? '<?%>' :
                             size > 75 ? '.08%';
        newbar.style.height = array[i];
        newbar.classList.add('bar');
        newbarArray.push(newbar);
    }
}



displaynewArray(){
    for(var i = 0; i < newbarArray.length; i++ ){
        stage.appendChild(newbarArray[i]);
    }
}




bar = document.createElement('DIV');
bar.style.height = array[n];

bar.style.width = getarraySize() < 15 || > 25 ? '5%' : 
                  getarraySize() <= 25 ? '2%' : 
                  getarraySize() <= 50  ? '1%' : 
                  getarraySize() > 75 ? '.08%'

FAST DELETE

while(stage.firstChild){
        stage.removeChild(stage.firstChild);
    }
    for(var i = 0; i <= array.length; i++){
        var trash = array.pop();
    }
*/


// DO NOT DELETE: DELETE ARRAY WITH FADE OUT *WORKING*




/*________Button definitions____

(****newArraybtn****)
-Calls resetArray

let arraySize = inputRangePosition
function changeArrSizeSlider(arraySize){

}



*/


/*___ function definitions____

(*****restArray()*******)
Definition:
//clear old array, populate new array of n.random number of elements

function resetArray(){
    
        while (stage.firstChild) {
        stage.firstChild.style.transition = "opacity .5s ease";
        stage.firstChild.style.opacity = 0;
        stage.removeChild(stage.firstChild);

        getArray();
        }
    }
 

function getArray(arraySize){
   
} 


*/








    // var btn = document.getElementsByClassName("butt");
    // var box = document.getElementById('div1');
    // var innerDiv = document.createElement("p");
    // innerDiv.className = "appendedbox";
    // btn[0].addEventListener("click", function(){
    //     box.appendChild(innerDiv);
    // });
    // for(let i = 0; i < stage.childNodes.length; i++){ 
    //     if(stage.childNodes[i].nodeName == 'DIV'){
    //         setTimeout(function() { 
    //             stage.childNodes[i].classList.add('remove');
    //         }, i * 50 );
    //     }
    // function bruteSort(){
    //     let smallerHeight = stage.childNodes[0].style.height;
    //     let smallerIndex = 0;
    //     // let temp = stage.childNodes.length - 1;
    //     // let max = temp.style.height;
    //     let unsorted = false;
    //     while(true){
    //         for(let i = 0; i < stage.childNodes.length; i++){
    //             if(stage.childNodes[i].style.height < stage.childNodes[smallerIndex].style.height){
    //                     //smaller               larger
    //                 swap(stage.childNodes[i], stage.childNodes[smallerIndex]);
    //                 smallerIndex = i;
    //             }
                
    //         }
    //         unsorted = false;
    //         for(let k = 0; k < stage.childNodes.length -1; k++){
    //             if(stage.childNodes[k].style.height > stage.childNodes[k + 1].style.height){
    //                 unsorted = true;
    //             }
    //         }
    //         if(unsorted == false){
    //             break;
    //         }
         
    //     }
    // }