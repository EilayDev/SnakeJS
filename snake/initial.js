

var zelda = 40;

var gridSize = new BlockPoint(12, 12);

var max_x = gridSize.x;
var max_y = gridSize.y;

var mainDiv = document.getElementById("mainDiv");
var canvas = document.getElementById("mainCan");
var finder = canvas.getContext('2d');

var currentPos = new BlockPoint();

var currentDirection ; // default
var directionInput = "up"; // The direction user wants to go

var numberOfHeads = 1;


var applePosition = new BlockPoint();

drawGrid(gridSize);
generateApple();
setInterval(tick, 350);