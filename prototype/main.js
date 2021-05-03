var zelda = 50;

var gridSize = new BlockPoint(500, 500);

var max_x = gridSize.x/zelda;
var max_y = gridSize.y/zelda;

var canvas = document.getElementById("mainCan");
var finder = canvas.getContext('2d');

function BlockPoint(x, y){
    this.x = x;
    this.y = y;
    function randomPoint() {
        this.x = Math.floor(Math.random() * max_x);
        this.y = Math.floor(Math.random() * max_y);
    }
};

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

function drawGrid(BlockPoint){
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = BlockPoint.x;
    ctx.canvas.height = BlockPoint.y;
    for (x = 0; x <= BlockPoint.x; x += zelda) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, BlockPoint.y);
        for (y = 0; y <= BlockPoint.y; y += zelda) {
            ctx.moveTo(0, y);
            ctx.lineTo(BlockPoint.x, y);
        }
    }
    ctx.stroke();
    drawInitialFinder();
    //drawEndBlock();
}

function placeRect(x, y, color){
    let cvs = canvas.getContext('2d');
    cvs.beginPath();
    cvs.rect((x)*zelda, (y)*zelda, zelda, zelda);
    cvs.fillStyle = color;
    cvs.fill();
    cvs.stroke();
}

var currentPos = new BlockPoint();
function placeFinder(point){
    console.log("(" + point.x + ", "+point.y+")");
    // Paint white over previous box
    finder.beginPath();
    finder.rect((currentPos.x)*zelda, (currentPos.y)*zelda, zelda, zelda);
    finder.fillStyle = "white";
    finder.fill();
    finder.stroke();

    // Draw on x, y
    finder.beginPath();
    finder.rect((point.x)*zelda, (point.y)*zelda, zelda, zelda);
    finder.fillStyle = "red";
    finder.fill();
    finder.stroke();
    
    currentPos.x = point.x;
    currentPos.y = point.y;
}

function drawInitialFinder(){
    let y = max_y - 1;
    let random_x = Math.floor(Math.random() * y+1);
    let initialPos = new BlockPoint(random_x, y);
    console.log("Starting at: X: " + random_x + ", Y: " + y);
    placeFinder(initialPos);
}

function drawEndBlock(){
    let y = 1;
    let random_x = Math.floor(Math.random() * max_y);
    console.log("Drawing End at: X: " + random_x + ", Y: " + y);
    placeRect(random_x, y, "green");
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
    let desiredPoint = new BlockPoint(currentPos.x, currentPos.y)
    switch (direction){
        case "up":
                desiredPoint.y--;
            break;
        case "down":
            desiredPoint.y++;
            break;
        case "left":
            desiredPoint.x--;
            break;
        case "right":
            desiredPoint.x++;
            break;
    }
    if (!collisionDetection(desiredPoint)){
        placeFinder(desiredPoint);
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
    move(direction);
});

drawGrid(gridSize);
generatePath();