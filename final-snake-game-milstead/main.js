//Define variables for canvas and ctx
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Define variable to get the width and height of the canvas element
var width = canvas.width;
var height = canvas.height;

//Define variables to create a grid on the canvas
var blockSize = 10;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;

//Define variable to hold the score
var score = 0;

//Define a function to draw the border that is one block (10 pixels) thick
var drawBorder = function() {
  ctx.fillStyle = "Gray";
  ctx.fillRect(0, 0, width, blockSize); //top
  ctx.fillRect(0, height - blockSize, width, blockSize); //bottom
  ctx.fillRect(0, 0, blockSize, height); //left
  ctx.fillRect(width - blockSize, 0, blockSize, height); //right
};

//Define a function to display the current score on the canvas
var drawScore = function() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, blockSize, blockSize);
};

//Define a function to end the game if the snake hits the wall or runs into itself
var gameOver = function () {
  clearInterval(intervalId); //This clears the setInterval function and stops the main game code from executing
  ctx.font = "60px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", width/2, height/2); //Displays the text in the middle of the canvas
};

//Define a function to draw a circle
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

//Create a block (object) constructor to represent individual blocks on the canvas with properties to represent the column and row coordinates
var Block = function (col, row){
  this.col = col;
  this.row = row;
};

//Define a function to draw a square at a certain location on the grid(canvas) and fill with a color passed as an argument
Block.prototype.drawSquare = function (color){
  var x = this.col * blockSize; //Column value is multiplied by the blockSize to get the location in pixels
  var y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

//Define a function to draw a circle at a certain location on the grid(canvas) and fill with a color passed as an argument
Block.prototype.drawCircle = function (color) {
  var centerX = this.col * blockSize + blockSize / 2;//The values have blockSize/2 (5) added in order to position the middle of the circle in the middle of the block
  var centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2 , true);
};

//Define a function to see if two blocks are in the same location on the grid. If it returns true, two game objects have collided, if false, they have not
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

//Create a snake (object) constructor with the properties direction and nextDirection
var Snake = function () {
  this.segments = [ //This array holds the coordinates of the block objects that will create the snake when the game starts
    new Block(7, 5),//Head of snake
    new Block(6, 5),
    new Block(5, 5),//Tail of snake
  ];

  this.direction = "right";
  this.nextDirection = "right";
};

//Draw the segments of the Snake with a draw method on the snake object
Snake.prototype.draw = function () {
  //For each value in segments array, draw a blue square at the cooresponding coordinates
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("Blue");
  }
};

//Define a move method on the Snake object
Snake.prototype.move = function () {
  var head = this.segments[0];
  var newHead; //This is the block that will represent the new head of the Snake

  //Update the direction of the Snake's movement to match the most recently pressed arrow key
  this.direction = this.nextDirection;

  //Depending on the value of this.direction, create a new head in the appropriate block
  if (this.direction === "right") {
    newHead = new Block (head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block (head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block (head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block (head.col, head.row - 1);
  }

  //Check for collision with a wall or the Snake's own body
  if (this.checkCollision(newHead)) {
    gameOver();
    return; // This return statement exits the move method (no following code is executed) if true if returned
  }

  //Add the newHead to the beginning of the segments array
  this.segments.unshift(newHead);

  //If the Snake's newHead and the apple's position property are equal, add one to the score and call the apple's move method
  //If not, use the pop method to remove the last item from segments array (this is the Snake's tail). This keeps the snake the same length since we added a newHead
  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};

//Define a method for the Snake object to check if it has collided with a wall or itself
Snake.prototype.checkCollision = function (head) {
  var leftCollision = (head.col === 0);
  var topCollision = (head.row === 0);
  var rightCollision = (head.col === widthInBlocks - 1);
  var bottomCollision = (head.row === heightInBlocks - 1);

  var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

  var selfCollision = false;

  for (var i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }

  return wallCollision || selfCollision;
};

//Define the setDirection method on the Snake object
//It checks whether the player is trying to make an illegal turn. If so, the method is ended early with return.
//Otherwise, the nextDirection property is updated
Snake.prototype.setDirection = function (newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }

  //If none of the above are true, assign the newDirection variable to the nextDirection property
  this.nextDirection = newDirection;
};

//Create the apple object and use a constructor to set its position property
var Apple = function () {
  this.position = new Block(10, 10);
};

//This method for the Apple object draws it
Apple.prototype.draw = function () {
  this.position.drawCircle("LimeGreen");
};

//This method for the Apple object moves it to a new position
Apple.prototype.move = function () {
  var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);
};

//Create the snake and apple objects
var snake = new Snake();
var apple = new Apple();

//This function is the main game logic. Every 100 milliseconds, execute the functions in this function.
var intervalId = setInterval(function() {
  ctx.clearRect(0,0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 100);

//Use a keydown event handler to set the Snake's direction
var directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

$("body").keydown(function(event) {
  var newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
});
