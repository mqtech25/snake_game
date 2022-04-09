var grid = document.getElementById("grid");
var btn = document.getElementById("playBtn");
var score = document.getElementById("score");
var gameSize = 600;
var noBox = 30;
var box = "";
var iniPos = 0;
var snake = [];
var head = iniPos;
var direction = 1;
var foodPos = "";
var gameTimer = "";
var isPlaying = false;
var wall = [];
var gameOver = false;
var totalBoxes = noBox * noBox;
var boxes = "";
var boxWidthHeight = gameSize / noBox;

initGame();

function initGame() {
  box = "";
  snake = [];
  grid.style.width = gameSize + "px";
  grid.style.height = gameSize + "px";
  grid.innerHTML = "";
  for (var i = 1; i <= totalBoxes; i++) {
    box +=
      "<div class='box' style='width:" +
      boxWidthHeight +
      "px;height:" +
      boxWidthHeight +
      "px'></div>";
  }
  grid.innerHTML = box;
  boxes = document.querySelectorAll(".box");

  iniPos = parseInt(Math.random() * totalBoxes + 1);
  drawWall();
  if (wall.includes(iniPos)) {
    initGame();
  } else {
    snake.push(iniPos);
    head = iniPos;
  }
  drawSnake();
  drawFood();
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    // boxes[snake[snake.length - 1]].classList = "box snake_head_up";
    boxes[snake[i]].classList += " snake";
  }
}
function drawWall() {
  for (let i = 0; i < boxes.length; i++) {
    if (
      (i >= 0 && i <= noBox - 1) ||
      (i >= totalBoxes - noBox && i < totalBoxes) ||
      (i + 1) % noBox == 0 ||
      i % noBox == 0
    ) {
      boxes[i].classList = "box wall";
      wall.push(i);
    }
  }
}
function moveSnake() {
  head += direction;

  snakHit(head);
  if (snake[snake.length - 1] == foodPos) {
    drawFood();
    snake.push(head);
    console.log(score);
    score.innerHTML = snake.length - 1;
  }
  for (let i = 0; i < snake.length; i++) {
    boxes[snake[i]].classList = "box";
  }
  snake.shift();
  snake.push(head);
  drawSnake();
}
function snakHit(head) {
  if (wall.includes(head) || snake.includes(head)) {
    clearInterval(gameTimer);
    alert("GameOver");
    btn.innerText = "Restart";
    isPlaying = false;
    gameOver = true;
    iniPos = 0;
    snake = [];
  }
}
function drawFood() {
  foodPos = parseInt(Math.random() * totalBoxes + 1);

  if (snake.includes(foodPos) || wall.includes(foodPos)) {
    drawFood();
  } else {
    boxes[foodPos].classList += " apple";
  }
}

document.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "ArrowUp":
      direction = -noBox;
      console.log(
        (boxes[snake[snake.length - 1]].classList = "box snake_head_up")
      );
      boxes[snake[snake.length - 1]].classList = "box snake_head_up";
      break;
    case "ArrowDown":
      direction = noBox;
      boxes[snake[snake.length - 1]].classList = "box snake_head_down";

      break;
    case "ArrowLeft":
      direction = -1;
      boxes[snake[snake.length - 1]].classList = "box snake_head_left";

      break;
    case "ArrowRight":
      direction = 1;
      boxes[snake[snake.length - 1]].classList = "box snake_head_right";

      break;
  }
});

function playGame() {
  if (!isPlaying && gameOver) {
    score.innerHTML = 0;
    initGame();
  }
  if (isPlaying) {
    clearInterval(gameTimer);
    isPlaying = false;
    btn.innerText = "Play";
  } else {
    gameTimer = setInterval(moveSnake, 3000);
    isPlaying = true;
    btn.innerText = "Pause";
  }
}
