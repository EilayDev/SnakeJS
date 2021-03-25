function BlockPoint(x, y){
    this.x = x;
    this.y = y;
    function randomPoint() {
        this.x = Math.floor(Math.random() * max_x);
        this.y = Math.floor(Math.random() * max_y);
    }
};

var zelda = 50;

var gridSize = new BlockPoint(500, 500);

var max_x = gridSize.x/zelda;
var max_y = gridSize.y/zelda;

var canvas = document.getElementById("mainCan");
var finder = canvas.getContext('2d');

var currentPos = new BlockPoint();

var currentDirection ; // default
var directionInput = "up"; // The direction user wants to go

drawGrid(gridSize);
generatePath();
setInterval(tick, 500);