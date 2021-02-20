var zelda = 25;
var width = 500;    // Default
var height = 500;   // Default

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
    drawEndBlock();
}
function placeRect(x, y, color){
    var cvs = canvas.getContext('2d');
    cvs.beginPath();
    cvs.rect((x)*zelda, (y-1)*zelda, zelda, zelda);
    cvs.fillStyle = color;
    cvs.fill();
    cvs.stroke();
}
var current_x, current_y;
function placeFinder(x, y){
    console.log("(" + x + ", "+y+")");
    // Paint white over previous box
    finder.beginPath();
    finder.rect((current_x)*zelda, (current_y-1)*zelda, zelda, zelda);
    finder.fillStyle = "white";
    finder.fill();
    finder.stroke();

    // Draw on x, y
    finder.beginPath();
    finder.rect((x)*zelda, (y-1)*zelda, zelda, zelda);
    finder.fillStyle = "red";
    finder.fill();
    finder.stroke();
    
    current_x = x;
    current_y = y;
}
function drawInitialFinder(){
    var y = height / zelda;
    var random_x = Math.floor(Math.random() * y);
    console.log("Starting at: X: " + random_x + ", Y: " + y);
    placeFinder(random_x, y);
}
function drawEndBlock(){
    var y = 1;
    var random_x = Math.floor(Math.random() * height/zelda);
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
            if (collisionDetection(current_x, current_y-1)){
                placeFinder(current_x, current_y-1);
            }
            break;
        case "ArrowDown":
            if (collisionDetection(current_x, current_y+1)){
                placeFinder(current_x, current_y+1);
            }
            break;
        case "ArrowLeft":
            if (collisionDetection(current_x-1, current_y)){
                placeFinder(current_x-1, current_y);
            }
            break;
        case "ArrowRight":
            if (collisionDetection(current_x+1, current_y)){
                placeFinder(current_x+1, current_y);
            }
            break;
    }
}
document.addEventListener('keyup', (event) =>{
    move(event.key);
});

drawGrid(width, height);
