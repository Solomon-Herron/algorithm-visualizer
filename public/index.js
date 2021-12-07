let stage = document.querySelector('#stage');
let newArraybtn = document.querySelector('#new-array');
let slider = document.querySelector('#myRange');
let bubblesort = document.querySelector('#bubblesort-btn');
let selectionsort =  document.querySelector('#selectionsort-btn');
let insertionsort =  document.querySelector('#insertionsort-btn');
let quicksort = document.querySelector('#quicksort-btn');
let mergesort = document.querySelecetor('#mergesort-btn');

let errormsg = document.querySelector('#errormsg');

newArraybtn.addEventListener("click", newArray);
bubblesort.addEventListener("click", bubbleSort);
selectionsort.addEventListener("click", selectionSort);
insertionsort.addEventListener("click", insertionSort);
quicksort.addEventListener("click", async () =>{                                    
    if(stage.children[0] === undefined){ return }
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

// mergeSort.addEventListener("click", ()=>{
//     let 
// });

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



let numOfBars = 50;
let speed = 100;
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
    // stage.childNodes[2].style.height = '550px';
    // stage.childNodes[9].style.height = '650px';   // These values are meant to illustrate the 'bubble' in a bubble sort
    // stage.childNodes[exampleindex].style.height = '650px';
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

//TODO FINISH MERGE SORT BUTTON
// async function mergeSort(first, middle, end){
//     if(stage.children[0] === undefined){ return }
//     if(isRunning) {
//         errormsg.style.opacity = '1';
//         await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
//         errormsg.style.opacity = '0';
//         return;
//     }
    
//     isRunning = true;
//     document.querySelector('#yellowblck').style.display = 'flex';
//     document.querySelector('#drkyellowblck').style.display = 'flex';
//     document.querySelector('#greyblck').style.display = 'flex';
//     document.querySelector('#redblck').style.display = 'flex';
//     document.querySelector('#red-text').innerHTML = 'Larger element has been identified';

//     let n = stage.childNodes.length;
//     let middle = (n-1) + 1;


// }


// async function merge(arr, l ,m){


// }


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


