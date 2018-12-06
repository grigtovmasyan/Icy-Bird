const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// images

const background = new Image();
const end = new Image();
const start = new Image();
const foreground = new Image();
const bird = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();


end.src = "end.png"
background.src = "back.png";
start.src = "start.png";
foreground.src = "fore.png";
bird.src = "bird.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";


//audio files

const fly = new Audio();
const next = new Audio();
const gameOver = new Audio();
const music = new Audio();


gameOver.src = "gameOver.mp3";
fly.src = "fly.mp3";
next.src = "next.mp3";
music.src = "music.mp3";


//variables

let animation = null;
let birdX = 10;
let birdY = 200;
let dist = 100;
let pipeX = canvas.width;
let score = 0;


let pipes = [];
pipes[0] = {
    x: pipeX,
    y: 0
};


//Score

const writeScore = function() {
    
    ctx.font="80px ArmColon";
    ctx.fillStyle = "orange";

    ctx.fillText("" + score, 140, 245,);
}


// draw function

const draw = function() {
    
    
    ctx.drawImage(background, 0, 0);
    let toDraw = true;
    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipeNorth.height + dist + pipes[i].y);
        pipes[i].x -= 1;

       
       // Game over conditions

        let foregroundCrash = birdY + bird.height >= background.height - foreground.height;
        let inPipeInterval = birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width;
        let upCrash = inPipeInterval && birdY <= pipes[i].y + pipeNorth.height;
        let donwCrash = inPipeInterval && birdY + bird.height >= pipes[i].y + pipeNorth.height + dist;

        if (foregroundCrash || upCrash || donwCrash) {
            

            music.pause();
            gameOver.play();
            ctx.drawImage(end, 0, 0);
            toDraw = false;
            break;
        } 
        else {
            if(pipes[i].x  === 40) {
                score++;
                next.play();
            }
        }
    }
    if(toDraw){
        if (pipes[pipes.length - 1].x === 100) {
          pipes.push({
                x: pipeX,
                y: Math.floor(pipeNorth.height * Math.random()) - pipeNorth.height
            });
        }
        
        ctx.drawImage(bird, birdX, birdY += 1);
        music.play();
        

        if (score === 5){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("Good", 80,80)

        }  
        if (score === 10){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("great", 80,80)

        }if (score === 15){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("awesome", 80,80)
        } else 
        if (score === 20){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("amazing", 80,80)
          
        }
        if (score === 25){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("excellent", 80,80)

        }if (score === 30){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("master", 80,80)
        } else 
        if (score === 35){

          ctx.font="40px Academy Italic";
          ctx.fillStyle = "white";
          ctx.fillText("expert", 80,80)
          
        }


        ctx.drawImage(foreground, 0, background.height - foreground.height);
        writeScore(); 
        animation = requestAnimationFrame(draw)
    } else{
        
    writeScore(); 
    }
     
}
function reset(){
    birdX = 10;
    birdY = 200;
    dist = 120;
    pipeX = canvas.width;
    score = 0;


    pipes = [];
    pipes[0] = {
        x: pipeX,
        y: 0
    };
    if(animation){
        cancelAnimationFrame(animation)
    }
    animation = requestAnimationFrame(draw);
}


const upKey = 38;
const space = 32;
document.addEventListener('keydown', function(event) {
    if(event.keyCode === 38) {
        birdY -= 30;
        birdX += 1;
        bird.src = "image.png"
        fly.play();
    } else if(event.keyCode === 32) {
        reset();
        music.play();
        
    }
}, false);



 
document.addEventListener('keyup', function(event) {
    if(event.keyCode === upKey){
        bird.src = "bird.png";    
    }


}, false);
window.onload = function(){
    ctx.drawImage(start, 0, 0)
    
}