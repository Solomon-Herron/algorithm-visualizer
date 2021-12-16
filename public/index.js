let stage = document.querySelector('#stage');
let newArraybtn = document.querySelector('#new-array');
let slider = document.querySelector('#myRange');
let bubblesort = document.querySelector('#bubblesort-btn');
let selectionsort =  document.querySelector('#selectionsort-btn');
let insertionsort =  document.querySelector('#insertionsort-btn');
let quicksort = document.querySelector('#quicksort-btn');
let mergesort = document.querySelector('#mergesort-btn');

let errormsg = document.querySelector('#errormsg');

newArraybtn.addEventListener("click", newArray);
bubblesort.addEventListener("click", bubbleSort);
selectionsort.addEventListener("click", selectionSort);
insertionsort.addEventListener("click", insertionSort);

// quick sort function is recursive, so some operations need to 
// be complete prior to calling the sort function, so they aren't 
// repeatedly executed.  
quicksort.addEventListener("click", async () =>{  
    if(stage.children[0] === undefined){ return }
    if(!isRunning){
        displayLegend("quickSort");
        let high = stage.childNodes.length - 1;
        await quickSort(0, high);
    } else {
        displayErrorMessage("isRunning")
        return;
    }
});


slider.addEventListener("mouseup", async ()=>{
    if(!isRunning){
        numOfBars = slider.value;
        speed = numOfBars < 25 ? 700 :
                numOfBars < 50 ? 500 : 
                numOfBars < 70 ? 80 : 20;
        newArray();
    } else {
        displayErrorMessage("isRunning")
        return;
    }
});


// ACTUAL INITIALIZATION VARIABLES

let numOfBars = 50;
// each sort function needs to know the speed calculated by newArray()
let speed = 100;
// running declared as global so every button in the
// options bar can access the current 'running' status
// and block execution accordingly
let isRunning = false;


async function newArray(){
    // blocks this function from running if another function is already executing.
    if(!isRunning){
        displayLegend("newArray");

        // delete old array
        while(stage.firstChild){
            stage.removeChild(stage.firstChild);
        }
        // push new array
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
    } else {
        displayErrorMessage("isRunning")
        return;
    }
}




// SORT FUNCTIONS
async function bubbleSort(){
    if(stage.children[0] === undefined){ return }
    if(!isRunning){
        isRunning = true;
        displayLegend("bubbleSort");

        // These values are meant to illustrate the 'bubble' in a bubble sort
        let exampleindex = Math.floor(stage.childNodes.length / 2);
        stage.childNodes[2].style.height = '425px';
        stage.childNodes[9].style.height = '450px';   
        stage.childNodes[exampleindex].style.height = '520px';

          //====Algorithm implementation====
          let n = stage.childNodes.length;
          for (let i = 0; i < n-1; i++){  // for each array element
              for(let j = 0; j < n-i-1; j++){                                                                        // cycle through entire array, 
                  stage.childNodes[j].style.background = "var(--yellow)";                                            // once an element of a higher value is evaluated (j+1), 
                  if(parseInt(stage.childNodes[j].style.height) > parseInt(stage.childNodes[j + 1].style.height))    // it is swapped with the current value (j)
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

    } else {
        displayErrorMessage("isRunning")
        return;
    }
}



async function selectionSort(){
    if(stage.children[0] === undefined){ return }
    if(!isRunning){
        isRunning = true;
        displayLegend("selectionSort");

        //====Algorithm implementation====
          let minIndex, i, k;
          for(i = 0; i < stage.childNodes.length - 1; i++){
              minIndex = i;
              for(k = i + 1; k < stage.childNodes.length; k++){
                  if(parseInt(stage.childNodes[k].style.height) < parseInt(stage.childNodes[minIndex].style.height)){       // Cycle through entire array, each iteration assigns the value of the   
                      minIndex = k;                                                                                         // smallest element to k... The value of k is then swapped with the value of
                  }                                                                                                          // the element at the END of the SORTED portion of the array. 
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

    } else {
        displayErrorMessage("isRunning")
        return;
    }
}

async function insertionSort(){
    if(stage.children[0] === undefined){ return }
    if(!isRunning){ 
        isRunning = true;
        displayLegend("insertionSort");

          //====Algorithm implementation====
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

    } else {
        displayErrorMessage("isRunning")
        return;
    }
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
    swap(stage.childNodes[i + 1], stage.childNodes[high]);;
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




function displayLegend(sortFunction){
    switch(sortFunction){
        case "bubbleSort":
            document.querySelector('#yellowblck').style.display = 'flex';
            document.querySelector('#drkyellowblck').style.display = 'flex';
            document.querySelector('#greyblck').style.display = 'flex';
            document.querySelector('#redblck').style.display = 'flex';
            document.querySelector('#red-text').innerHTML = 'Larger element has been identified';
            break;
        case "selectionSort":
            document.querySelector('#yellowblck').style.display = 'flex';
            document.querySelector('#drkyellowblck').style.display = 'flex';
            document.querySelector('#greyblck').style.display = 'flex';
            break;
        case "insertionSort":
            document.querySelector('#yellowblck').style.display = 'flex';
            break;
        case "quickSort":
            document.querySelector('#yellowblck').style.display = 'flex';
            document.querySelector('#drkyellowblck').style.display = 'flex';
            document.querySelector('#greyblck').style.display = 'flex';
            document.querySelector('#redblck').style.display = 'flex';
            document.querySelector('#cyanblck').style.display = 'flex';
            break;
        case "mergeSort":
            // TODO
            break;
        case "newArray":
            document.querySelector('#yellowblck').style.display = 'none';
            document.querySelector('#drkyellowblck').style.display = 'none';
            document.querySelector('#greyblck').style.display = 'none';
            document.querySelector('#redblck').style.display = 'none';
            document.querySelector('#cyanblck').style.display = 'none';
            break;    
    }

}

async function displayErrorMessage(error){
    switch(error){
        case "isRunning":
            errormsg.style.opacity = '1';
            await new Promise(resolve => setTimeout(() => {resolve()}, 5000));
            errormsg.style.opacity = '0';
            break;
    }
}

//TODO - finish merge sort functionality

// mergeSort.addEventListener("click", ()=>{
//     let 
// });

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