let t1 = anime.timeline({
    autoplay: false,
    easing: 'cubicBezier(0.000, 0.000, 0.580, 1.000)',
});

let loginmenuAnime = anime.timeline({
    autoplay: false,
    easing: 'spring(1, 80, 10, 0)',
})

t1.add({
    targets: '#welcome-btn',
    scaleX: 10,
    scaleY: 10,
    duration: 100
})

let i =0;
let stop = true;
let submitbtn = document.querySelector("#submitbutton");
submitbtn.addEventListener("click", ()=> stop = false);
let bars = document.querySelector("#bars");
let welcomebtn = document.querySelector('#welcome-btn');
let loginmenu = document.querySelector('#login-box');
welcomebtn.addEventListener("click", async ()=>{
    welcomebtn.innerHTML = " ";
    welcomebtn.style.boxShadow = 'none';
    t1.play();
    await new Promise(resolve => setTimeout(() => {resolve()}, 1005));
    document.body.style.backgroundColor = 'var(--main-bg-color)';
    welcomebtn.remove();
    loginmenu.style.left = '75%';
    while(stop){
        await new Promise(resolve => setTimeout(() => {resolve()}, 100));
        let size = i * (Math.random() * 100);
        bars.children[i].style.width = size + 'px';
        i++;
        await new Promise(resolve => setTimeout(() => {resolve()}, 100));
        bars.children[i].style.width = '0px';
        if(i == 18){
            i = 0;
        }
    }
})

  