

var zelda = 40;

var gridSize;

let urlParams = new URLSearchParams(window.location.search);
let url_x = urlParams.get("x");
let url_y = urlParams.get("y");
console.log(typeof url_x)
if (url_x == null|| url_y == null){
    gridSize = new BlockPoint(12, 12);
}
else {
    gridSize = new BlockPoint(url_x, url_y);
}

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