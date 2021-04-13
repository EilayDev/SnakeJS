function gameFailed(){
    clear();
    clearInterval(tickInterval);
    console.log("GAME FAILED!")
}

function moveSnake(direction){
    if (!mainHead.isCollided()){
        mainHead.move(direction);
    }
    else{
        gameFailed();
    }
}

function cheat_setSnakeSize(size){
    for (let i = 0; i < size; i++){
        addToSnake();
    }
}

function addToSnake(){
    let newTail = new tail(new BlockPoint(posHistory[snake.length+1]));
    snake.push(newTail);
}

function tick(){
    clear();
    // Detect illegal move
    if (!(currentDirection == UP && directionInput == DOWN ||
        currentDirection == DOWN && directionInput == UP ||
        currentDirection == LEFT && directionInput == RIGHT ||
        currentDirection == RIGHT && directionInput == LEFT))
        {

        currentDirection = directionInput;
        moveSnake(directionInput);

    }
    else {
        console.log("illegal snake move");
        moveSnake(currentDirection);
    }    
    drawSnake();

    // Detect if on apple
    if (BlockPoint.isEqual(mainHead.currentPosition, applePosition)) {
        addToSnake(); // add another part to snake
        generateApple();
    }
    drawApple();

    // Detect if snake eats itself
    for (pos of posHistory){
        if (BlockPoint.isEqual(mainHead.currentPosition, pos)){
            gameFailed();
        }
    }

    // For debug
    console.log("(" + mainHead.currentPosition.x + ", "+mainHead.currentPosition.y+")");
}

function generateApple(){
    applePosition.randomPoint();
}

document.addEventListener('keyup', (event) =>{
    let direction = 0;
    switch (event.key){
        case "ArrowUp":
            direction = UP;
            break;
        case "ArrowDown":
            direction = DOWN;
            break;
        case "ArrowLeft":
            direction = LEFT;
            break;
        case "ArrowRight":
            direction = RIGHT;
            break;
    }
    directionInput = direction;
    
});
