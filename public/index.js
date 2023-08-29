//==DOM OBJECTS==
const stage = document.querySelector('#stage');
const array = stage.childNodes;
const getnewArraybtn = document.querySelector('#new-array');
const slider = document.querySelector('#myRange');
const bubblesort = document.querySelector('#bubblesort-btn');
const selectionsort =  document.querySelector('#selectionsort-btn');
const insertionsort =  document.querySelector('#insertionsort-btn');
const quicksort = document.querySelector('#quicksort-btn');
const mergesort = document.querySelector('#mergesort-btn');
const errormsg = document.querySelector('#errormsg');
// const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)


//==ACTUAL INITIALIZATION VARIABLES==
const yellow = "var(--yellow)"; 
const mintGreen = "var(---mint-green)";  
const lightGrey = "var(--light-grey)";     
const darkYellow = "var(--darkyellow)";
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
        let high = array.length - 1;
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



//====================
//===SORT FUNCTIONS=== 
//====================


async function bubbleSort(){
    if(stage.children[0] === undefined){ return }  
    if(!isRunning){ 
        isRunning = true;
        displayLegend("bubbleSort");

        // These values are meant to illustrate the 'bubble' in a bubble sort
        array[2].style.height = '425px';
        array[9].style.height = '450px';   
        let exampleindex = Math.floor(array.length / 2);
        array[exampleindex].style.height = '520px';

        
          //====Algorithm implementation====
          let n = array.length;
          for (let i = 0; i < n-1; i++){  // for each array element
              for(let j = 0; j < n-i-1; j++){       
                  let nextEl = j + 1;
                  let jHeight = parseInt(array[j].style.height);
                  let nextElHeight = parseInt(array[nextEl].style.height);                                                                 // cycle through entire array, 
                  changeElementColor(j, yellow);                                           // once an element of a higher value is evaluated (j+1), 
                  
                  if( jHeight > nextElHeight ){                                             // it is swapped with the current value (j)
                      await pauseAnimation(animSpeed);
                      swap(array[nextEl], array[j]);                  
                    } else { 
                    await pauseAnimation(animSpeed * 2);
                    await changeElementColor(nextEl, "red", true, 2);
                    await changeElementColor(nextEl, mintGreen, true, 2);
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
          let indexOfMin, i, k;
          for(i = 0; i < array.length - 1; i++){
              indexOfMin = i;
              
              for(k = i + 1; k < array.length; k++){
                  let kHeight = parseInt(array[k].style.height);
                  let indexOfMinHeight = parseInt(array[indexOfMin].style.height);
                  if( kHeight < indexOfMinHeight){                                      // Cycle through entire array, each iteration assigns the value of the   
                      indexOfMin = k;                                                   // smallest element to k... The value of k is then swapped with the value of
                  }                                                                     // the element at the END of the SORTED portion of the array. 
              } 

              await changeElementColor(indexOfMin, yellow, true, 3);
              swap(array[indexOfMin], array[i]);
              await changeElementColor(i, darkYellow, true, 1);
              
              for(let p = 0; p < i; p++){
                  changeElementColor(p, lightGrey);
              }
              await changeElementColor(indexOfMin, mintGreen);
        
          }
          array[array.length - 1].style.background = lightGrey;
          array[array.length - 2].style.background = lightGrey;
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
          for(i = 1; i < array.length; i++){
              key = parseInt(array[i].style.height);
              k = i - 1;
              
              while( k >= 0 && parseInt(array[k].style.height) > key)
              {
                  smallestEl = k + 1; 
                  await changeElementColor(smallestEl, yellow, true, 1);
                  swap(array[smallestEl], array[k])
                  await changeElementColor(smallestEl, mintGreen);
                  k -= 1;
              }
              array[k + 1].style.height = key;
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
    // grey out sorted portion of array
    for(let i = 0; i <= high; i++){
        changeElementColor(i, lightGrey);
    }
}

async function partition(low, high){
    //grey out sorted portion of array
    for(let i = 0; i < low; i++){
        changeElementColor(i, lightGrey);
    }
    // algorithm implementation
    let pivot = parseInt(array[high].style.height);
    //  [0]or[?]            [n]=pivot
    let i = (low - 1);
    
    for( let j = low; j <= high -1; j++){
        //on each pass, a section of the array is traversed,
        //any element shorter in height than pivot (on first pass this is [n-1])
        //is moved to the beginning of the array.
        await changeElementColor(high, "red");
        await changeElementColor(low, "#00FFF4");
        if(parseInt(array[j].style.height) < pivot){ 
            //for every element smaller than the pivot, i increases by 1   
            i++;
            await changeElementColor(j, yellow, true, 3);
            swap(array[i], array[j]);
            await changeElementColor(i, darkYellow, true, 1);
            await changeElementColor(i, mintGreen);
            await changeElementColor(j, mintGreen);
        }
        changeElementColor(high, mintGreen); //green
        changeElementColor(low, mintGreen);


    }
    await pauseAnimation(animSpeed * 3);
    swap(array[i + 1], array[high]);;
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

async function pauseAnimation(time){
    return new Promise(resolve => setTimeout(() => {resolve()}, time));
}

async function changeElementColor(element, color, hasAnim, animSpeedMagnifier){
    array[element].style.background = color;
    if(hasAnim){
        return new Promise(resolve => setTimeout(() => {resolve()}, animSpeed * animSpeedMagnifier));
    } else { return; }
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
            await pauseAnimation(5000);
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

