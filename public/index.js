//==DOM OBJECTS==
let stage = document.querySelector('#stage');
let getnewArraybtn = document.querySelector('#new-array');
let slider = document.querySelector('#myRange');
let bubblesort = document.querySelector('#bubblesort-btn');
let selectionsort =  document.querySelector('#selectionsort-btn');
let insertionsort =  document.querySelector('#insertionsort-btn');
let quicksort = document.querySelector('#quicksort-btn');
let mergesort = document.querySelector('#mergesort-btn');
let errormsg = document.querySelector('#errormsg');


//==ACTUAL INITIALIZATION VARIABLES==
let yellow = "var(--yellow)"; 
let mintGreen = "var(---mint-green)";  
let lightGrey = "var(--light-grey)";     
let darkYellow = "var(--darkyellow)";
// isRunning declared as global so every button in the
// options bar can access the current 'running' status
// and block their own execution accordingly
let isRunning = false;
let numOfBars = 50; 


//==EVENT LISTENERS==
getnewArraybtn.addEventListener("click", getnewArray);
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
        let low = 0;
        await quickSort(low, high);
    } else {
        displayErrorMessage("isRunning");
        return;
    }
});
// animSpeed initialized globally because each sort function needs to know
// the animation animSpeed, which is calculated by slider "mouseup" event listener    
let animSpeed = 100; 
slider.addEventListener("mouseup", async ()=>{
    if(!isRunning){
        numOfBars = slider.value;
        animSpeed = numOfBars < 25 ? 700 :
                    numOfBars < 50 ? 500 : 
                    numOfBars < 70 ? 80 : 20;
        getnewArray();
    } else {
        displayErrorMessage("isRunning")
        return;
    }
});




//==SORT FUNCTIONS== 
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
              for(let j = 0; j < n-i-1; j++){       
                  let nextEl = j + 1;                                                                 // cycle through entire array, 
                  changeElementColor(j, yellow);                                           // once an element of a higher value is evaluated (j+1), 
                  if(parseInt(stage.childNodes[j].style.height) > parseInt(stage.childNodes[nextEl].style.height))    // it is swapped with the current value (j)
                  {
                      await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed));
                      swap(stage.childNodes[nextEl], stage.childNodes[j]);
                  } else { 
                    await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 2));
                    changeElementColor(nextEl, "red");
                    await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 2));
                    changeElementColor(nextEl, mintGreen);
                    await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 2));
                  }
                  changeElementColor(j, mintGreen);
                  changeElementColor(nextEl, lightGrey);
              }
          }
          changeElementColor(0, lightGrey);
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
              changeElementColor(minIndex, yellow);
              await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 3));
              swap(stage.childNodes[minIndex], stage.childNodes[i]);
              changeElementColor(i, darkYellow);
              await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed));
              
              for(let p = 0; p < i; p++){
                  changeElementColor(p, lightGrey);
                }
              changeElementColor(minIndex, mintGreen);
        
          }
          stage.childNodes[stage.childNodes.length - 1].style.background = lightGrey;
          stage.childNodes[stage.childNodes.length - 2].style.background = lightGrey;
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
          let i, key, k, smallestEl;
          for(i = 1; i < stage.childNodes.length; i++){
              key = parseInt(stage.childNodes[i].style.height);
              k = i - 1;
              
              while( k >= 0 && parseInt(stage.childNodes[k].style.height) > key)
              {
                  smallestEl = k + 1; 
                  changeElementColor(smallestEl, yellow);
                  await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed));
                  swap(stage.childNodes[smallestEl], stage.childNodes[k])
                  changeElementColor(smallestEl, mintGreen);
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
        changeElementColor(high, "red");
        changeElementColor(low, "#00FFF4");
        if(parseInt(stage.childNodes[j].style.height) < pivot){ 
            //for every element smaller than the pivot, i increases by 1   
            i++;
            changeElementColor(j, yellow);
            await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 3));
            swap(stage.childNodes[i], stage.childNodes[j]);
            changeElementColor(i, darkYellow);
            await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed));
            changeElementColor(i, mintGreen);
            changeElementColor(j, mintGreen);
        }
        changeElementColor(high, mintGreen); //green
        changeElementColor(low, mintGreen);


    }
    await new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * 3));
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

 function changeElementColor(element, color){
    stage.childNodes[element].style.background = color;
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
        case "getnewArray":
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

async function getnewArray(){
    if(!isRunning){
        displayLegend("getnewArray");

        // delete old array
        while(stage.firstChild){
            stage.removeChild(stage.firstChild);
        }
        // push new array
        for(let i = 0; i <= numOfBars; i++){
            let newBar = document.createElement('DIV');
            newBar.style.width = numOfBars < 15 ? '5%' : 
                                 numOfBars <= 25 ? '2%' : 
                                 numOfBars <= 50 ? '1%' :
                                 numOfBars <= 75 ? '.08%' : '.05%'; 
            newBar.style.height = (Math.floor((Math.random() * 400) + 1)) + 'px';
            newBar.classList.add('bar');
            stage.appendChild(newBar);
        }

    } else {
        displayErrorMessage("isRunning")
        return;
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

