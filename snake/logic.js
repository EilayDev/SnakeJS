
function tick(){
    console.log(directionInput)
    if (!(currentDirection == "up" && directionInput == "down" ||
        currentDirection == "down" && directionInput == "up" ||
        currentDirection == "left" && directionInput == "right" ||
        currentDirection == "right" && directionInput == "left"))
        {

        move(directionInput);
    }
    else {
        console.log("illegal snake move");
    }
}

function generatePath(){
    for (path_y = currentPos.y-1; path_y >= 0; path_y--){
        let random_direction = Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1);
        let drawCount = 0;
        for (path_x = currentPos.x; path_x >= 0 && path_x < max_x && drawCount <= 4; path_x+=random_direction){
            placeRect(path_x, path_y, "yellow");
            ++drawCount;
        }
    }
}

function getCustomSize(){
    let newHeight = document.getElementById("custom_x").value;
    let newWidth = document.getElementById("custom_y").value;
    let reminder = (newHeight + newWidth) % zelda;
    console.log("Reminder: " + reminder);
    if (reminder != 0){
        console.log("Invalid values!");
        return;
    }
    gridSize.x = newWidth;
    gridSize.y = newHeight;
    
    console.log("New width: " + width + "\nNew height: " + height);
    let point = new BlockPoint(newWidth, newHeight);
    drawGrid(point);
}

function collisionDetection(point){
    if (point.x >= max_x | point.y >= max_y | point.x < 0 | point.y < 0){
        console.log("Collision!")
        return true;
    }
    else{
        return false;
    }
}

function move(direction){
    let nextPosition = new BlockPoint(currentPos.x, currentPos.y)
    switch (direction){
        case "up":
            currentDirection = "up";
            nextPosition.y--;
            break;
        case "down":
            currentDirection = "down";
            nextPosition.y++;
            break;
        case "left":
            currentDirection = "left";
            nextPosition.x--;
            break;
        case "right":
            currentDirection = "right";
            nextPosition.x++;
            break;
    }
    if (!collisionDetection(nextPosition)){
        placeFinder(nextPosition);
    }
}

document.addEventListener('keyup', (event) =>{
    let direction;
    switch (event.key){
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
    directionInput = direction;
});
