class Algorithm {
    constructor(algo, runningStatus){
        this.algo = algo;
        this.runningStatus = runningStatus;
    }
}
let bubble = new Algorithm(() => {
    console.log("works");
}, false);

//bubble.algo();

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

const posts = [
    {title: "Post one", body: "Body one"},
    {title: "Post Two", body: "Body Two"}
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += post.title;
        });
        console.log(output);
    }, 1000)
}

getPosts();

function createPost(post) {
    setTimeout(() =>{
        posts.push(post);
    }, 2000)
}

createPost({title: "Hello Solo", body: "Itsa me madio"});

getPosts();

//=====
//=====

function doThing(str){
    console.log("callback: " + str);
}

function needCallbck(str2, callback){
    let str = "s" + str2;
    callback(str);
}

needCallbck("ck", doThing);
