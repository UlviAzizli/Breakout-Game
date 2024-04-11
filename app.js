//we save information what we got.
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

let timerId;
let score = 0;

const userStart = [230, 10];
//user start every time the same position,
//when user start, current position will change accordingly(reason for using let).
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

//for create multiple blocks we use constructor
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//creating blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
//to control what is going on, and later can explain with console.log
//console.log(blocks);

//we have to draw blocks which we already give it size.
//we iterate them and create 15 blocks, give them style,
//and (important) seperate them in page, which they all occupied same spot.
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlocks();

//adding user(for this firstly create it, then add it class for able to work css)
const user = document.createElement("div");
user.classList.add("user");
//then we put user in the grid
grid.appendChild(user);
//call a function to make the user appear at the bottom middle.
drawUser();

//adding ball(repeat user method)
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

//make user start middle bottom(add left and top property and append "px").
//because to be able to use it later add it inside function
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//now we create function for when we press left or right button,
//it response and user block start moving
//and we give it statement not to left our grid(display)
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
}
timerId = setInterval(moveBall, 30);
