const gameStart = document.getElementById("game-start");
const game = document.getElementById("game");
const gameEnd = document.getElementById("game-end");
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let timerId;
let score = 0;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  startGame();
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", function () {
  window.location.reload();
});

function startGame() {
  gameStart.style.display = "none";
  game.style.display = "block";
  timerId = setInterval(moveBall, 30);
}

function showEndScreen(message) {
  game.style.display = "none";
  gameEnd.style.display = "block";
  document.getElementById("final-score").innerText = score;
  document.getElementById("game-end-message").innerHTML = message;
}

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

const player = new Player(userStart);
player.draw();

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

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw();
  }
}
addBlocks();

const ball = new Ball(ballStart);
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
  }
}
document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  ball.draw();
  checkForCollision();
}

function checkForCollision() {
  // Block collision checking
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = document.querySelectorAll(".block");
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = `point: ${score}`;
      if (blocks.length == 0) {
        //scoreDisplay.innerHTML = "Congratulations, You Win!";
        clearInterval(timerId);
        showEndScreen("Congratulations, You Win!");
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  // Wall collision checking
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  // User collision checking
  if (
    ballCurrentPosition[0] + ballDiameter > player.position[0] &&
    ballCurrentPosition[0] < player.position[0] + blockWidth &&
    ballCurrentPosition[1] > player.position[1] &&
    ballCurrentPosition[1] < player.position[1] + blockHeight
  ) {
    changeDirection();
  }

  // Game over checking
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    showEndScreen("Game Over. You Lose!");
    //scoreDisplay.innerHTML = "Game Over. You Lose!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
  }
}
