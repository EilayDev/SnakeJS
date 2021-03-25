function drawEndBlock(){
    let y = 1;
    let random_x = Math.floor(Math.random() * max_y);
    console.log("Drawing End at: X: " + random_x + ", Y: " + y);
    placeRect(random_x, y, "green");
}

function drawInitialFinder(){
    let y = max_y - 1;
    let random_x = Math.floor(Math.random() * y+1);
    let initialPos = new BlockPoint(random_x, y);
    console.log("Starting at: X: " + random_x + ", Y: " + y);
    placeFinder(initialPos);
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

function placeRect(x, y, color){
    let cvs = canvas.getContext('2d');
    cvs.beginPath();
    cvs.rect((x)*zelda, (y)*zelda, zelda, zelda);
    cvs.fillStyle = color;
    cvs.fill();
    cvs.stroke();
}