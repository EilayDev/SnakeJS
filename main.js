var zelda = 20;
var width = 500;
var height = 500;

const UP_CODE = 38;
const RIGHT_CODE = 39;
const DOWN_CODE = 40;
const LEFT_CODE = 37;

var canvas = document.getElementById("mainCan");
var finder = canvas.getContext('2d');

function drawGrid(width, height){
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    for (x = 0; x <= width; x += zelda) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        for (y = 0; y <= height; y += zelda) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
    }
    ctx.stroke();
    drawInitialFinder();
}
function placeRect(x, y, color){
    var cvs = canvas.getContext('2d');
    cvs.beginPath();
    cvs.rect((x)*zelda, (y-1)*zelda, zelda, zelda);
    cvs.fillStyle = color;
    cvs.fill();
    cvs.stroke();
}
var previous_x, previous_y;
function placeFinder(x, y){
    console.log("(" + x + ", "+y+")");
    // Paint white over previous box
    finder.beginPath();
    finder.rect((previous_x)*zelda, (previous_y-1)*zelda, zelda, zelda);
    finder.fillStyle = "white";
    finder.fill();
    finder.stroke();

    // Draw on x, y
    finder.beginPath();
    finder.rect((x)*zelda, (y-1)*zelda, zelda, zelda);
    finder.fillStyle = "red";
    finder.fill();
    finder.stroke();
    
    previous_x = x;
    previous_y = y;
}
function drawInitialFinder(){
    var y = height / zelda;
    var random_x = Math.floor(Math.random() * y);
    placeFinder(random_x, y);
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
    width = newWidth;
    height = newHeight;
    console.log("New width: " + width + "\nNew height: " + height);
    drawGrid(width, height);
}
function collisionDetection(desired_x, desired_y){
    let heightInBlock = height / zelda;
    let widthInBlock = width / zelda;
    if (desired_x > heightInBlock-1 | desired_y > widthInBlock | desired_x < 0 | desired_y <= 0){
        console.log("Collision!")
        return false;
    }
    else{
        return true;
    }
}
function move(direction){
    switch (direction){
        case "ArrowUp":
            if (collisionDetection(previous_x, previous_y-1)){
                placeFinder(previous_x, previous_y-1);
            }
            break;
        case "ArrowDown":
            if (collisionDetection(previous_x, previous_y+1)){
                placeFinder(previous_x, previous_y+1);
            }
            break;
        case "ArrowLeft":
            if (collisionDetection(previous_x-1, previous_y)){
                placeFinder(previous_x-1, previous_y);
            }
            break;
        case "ArrowRight":
            if (collisionDetection(previous_x+1, previous_y)){
                placeFinder(previous_x+1, previous_y);
            }
            break;
    }
}
document.addEventListener('keyup', (event) =>{
    move(event.key);
});

drawGrid(width, height);
