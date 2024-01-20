//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var points = 0;

//snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update, 1000/5);
}

function update() {
    document.getElementById("Points").innerHTML = points;
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    
    if(snakeX >= 20 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeY >= 20 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeX <= -1 * blockSize){
        restart();
        window.alert("game over");
    }
    if(snakeY <= -1 * blockSize){
        restart();
        window.alert("game over");
    }
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        points++;
        document.getElementById("Points").innerHTML = points;
        placeFood();
    }
    
    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle="lime";
    snakeX +=velocityX * blockSize;
    snakeY +=velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for ( let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            restart();
            window.alert("game over");
        }
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    
    
}

function restart(){
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeX = 5 * blockSize;
    snakeY = 5 * blockSize;
    placeFood();
    points = 0;
    
}

function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != 1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "Space") {
        velocityX = 0;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random()* cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    
}