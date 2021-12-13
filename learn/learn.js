function greet(name){
    alert('Hello ' + name);
}

function processUserInput(callback){
    let name = prompt('Please enter your name.');
    callback(name);  
}

processUserInput(greet);