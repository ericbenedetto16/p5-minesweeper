function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
var started = false;
var ffX;
var ffY;
var eeX;
var eeY;
var ssX;
var ssY;
var grid;
var cols;
var rows;
var w;
var ff;
var ee;
var ss = true;
var totalBees;
var txtSize;

function setup() {
  createCanvas(401, 401);
  ffX = width/2 - 75;
  ffY = height/2 - 25;
  eeX = width/2 - 75;
  eeY = height/2 + 30;
  ssX = width/2 -75;
  ssY = height/2 + 85;
  if(ff) {
    console.log("YURR");
    cols = 4;
    rows = 4;
    w = 100;
    totalBees = 6;
  }
  if(ee) {
    cols = 8;
    rows = 8;
    w = 50;
    totalBees = 20
  }
  if(ss) {
    cols = 16;
    rows = 16;
    w = 25;
    totalBees = 81;
  }
  txtSize = w;

  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBees; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid[i][j].bee = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBees();
    }
  }

  document.onclick = function() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          if(grid[i][j].flagged === false) {
            grid[i][j].reveal();
          }
          if (grid[i][j].flagged === false && grid[i][j].bee) {
            gameOver();
          }
        }
      }
    }
  }

  document.oncontextmenu = function () {
    event.preventDefault();
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          if(grid[i][j].flagged == true) {
            grid[i][j].flagged = false;
          }else {
            grid[i][j].flagged = true;
          }
        }
      }
    }
  }

  function gameOver() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].revealed = true;
      }
    }
  }
}

function draw() {
  background(0);
  fill(255);
  rect(0, 0, 400, 400);
  rect(width/2 - 75, height/2 - 25, 150, 50);
  rect(width/2 - 75, height/2 + 30, 150, 50);
  rect(width/2 - 75, height/2 + 85, 150, 50);
  rect(width/2 - 75, height/2 + 85, 150, 50);

  fill(0);
  textSize(50);
  textAlign(CENTER);
  text("Eric's \n Minesweeper", width/2 + 10, 60);
  textSize(20);
  text("Beginner", width/2 + 2, height/2 + 7);
  text("Intermediate", width/2 + 3, height/2 + 62);
  text("Expert", width/2 + 1, height/2 + 117);
  textSize(15);
  text("Press 1, 2, or 3 for Beginner, Intermediate, or Expert", width/2 + 1, height - 40);

  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
