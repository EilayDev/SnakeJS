

var zelda = 40;

var gridSize;

let urlParams = new URLSearchParams(window.location.search);
let url_x = urlParams.get("x");
let url_y = urlParams.get("y");
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

const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;

var currentDirection ; // default
var directionInput = UP; // The direction user wants to go

var snake = [];

let random_x = Math.floor(Math.random() * max_y); // random initial position
var posHistory = [];
var mainHead = new head(new BlockPoint(random_x, max_y - 1));

snake.push(mainHead);

var applePosition = new BlockPoint();

const movementSpeed = 500;

drawGrid(gridSize);
generateApple();
var tickInterval = setInterval(tick, movementSpeed);

// for debug
cheat_setSnakeSize(5);