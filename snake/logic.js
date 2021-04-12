// TODO: detect head to snake collision

function moveSnake(direction){
    if (!mainHead.isCollided()){
        mainHead.move(direction);
    }
    else{
        console.log("GAME FAILED!")
    }
}

function drawSnake(){
    mainHead.draw();
    for (let i = 1; i < posHistory.length; i++){
        drawHead(posHistory[i]);
    }
}

function tick(){
    clear();
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
    if (mainHead.currentPosition.x == applePosition.x && mainHead.currentPosition.y == applePosition.y){
        // add another head to snake
        let newTail = new tail(new BlockPoint(posHistory[snake.length+1]));
        snake.push(newTail);
        generateApple();
    }
    drawApple();

    // For debug
    console.log("(" + mainHead.currentPosition.x + ", "+mainHead.currentPosition.y+")");
}


function drawApple(){
    drawRect(applePosition, "yellow");
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
