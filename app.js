let d = document.addEventListener('keypress', gamestart);

let gameSeq = [];
let userSeq = [];

let level = 0;

//we are taking this is a boolean variable to start the game only once, or else if we keep pressing keys, it will keep staring the game over and over again
let started = false;

function gamestart() {
    if (started == false) {
        document.querySelector('h3').innerText = `Game started`;
        let h3 = document.createElement('h3');
        // h3.innerText='level '+level;

        // h3.setAttribute('class','lel')

        document.querySelector('h3').insertAdjacentElement('afterend', h3);
        console.log('game started');
        started = true;

        playGame();

    }

}

function playGame() {

    userSeq = [];

    level++;

    console.log('now level is', level);

    document.querySelectorAll('h3')[1].innerText = `level ${level}`
    let rn = Math.ceil(Math.random() * 4);
    console.log(rn);

    let rd = document.querySelector(`.b${rn}`);
    btnFlash(rd);
    //if we donot want to access by numbers, then make an array outside which has button colors in it's indexes, then, let random number generate a random array index, and we can flash that button by selecting by it's color class, but for that we should create color classes.  

    gameSeq.push(rn);
    console.log('game sequence is', gameSeq);
}

function btnFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash')
    }, 200)
}

function userFlash(btn) {

    btn.classList.add('userFlash');
    setTimeout(function () {
        btn.classList.remove('userFlash')
    }, 200)
}

let btns = document.querySelectorAll('div div div');
for (i of btns) {
    i.addEventListener('click', btnPressed)
}

function btnPressed() {

    if (!started) {
        return;
    }

    // console.log(`button ${this.innerText} was pressed`); //removing this once the code is completed
    //here 'this' automatically refers to the button pressed as it is the one calling it using i.addEventListener(event,function(){})
    userFlash(this);
    userSeq.push(Number(this.innerText));

    console.log('user :', userSeq);

    checkAns();
}

function checkAns() {
    

    for (let i = 0; i < userSeq.length; i++) {

        if (userSeq[i] !== gameSeq[i]) {
            console.log('error');
            reset();
            break;
        }

    }
    if (userSeq.length == gameSeq.length) {
        // return true;
        setTimeout(playGame, 1000);
    }

}

function reset(){ 

    document.body.style.backgroundColor = 'red';

    setTimeout(function(){
        document.body.style.backgroundColor = 'white';
    },200)

    document.getElementById('score').innerText ='Your score was '+ level;

    let hi = document.getElementById('highest');
    let hiN = Number(hi.innerText.replace(/[a-zA-Z: ]/g,''));
    let lN = level;

    if(hiN=='' || hiN < lN){
        hi.innerText = `Highest score: ${lN}`
    }
    
    document.querySelector('h3').innerText = 'Game ended! \n Press any key to start';
    started = false;
    gameSeq = [];
    level = 0;

    document.querySelectorAll('h3')[1].remove();
    console.log(document.querySelectorAll('h3')[1]); //this is not required but just doing it to show which element is score
} 
