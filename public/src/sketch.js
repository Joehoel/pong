const socket = io.connect("http://localhost:3000");

socket.on("message", message => {
  console.log(message);
});

let leftscore = 0;
let rightscore = 0;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
  left = new Box(true);
  right = new Box(false);
}
function draw() {
  background(0);
  noStroke();

  ball.checkRight(right);
  ball.checkLeft(left);

  //     if (ball.checkRight(right)) {
  //        ball.accelerate();
  //         } else if (ball.checkLeft(left)) {
  //         ball.accelerate();
  //         }

  left.show();
  right.show();
  left.update();
  right.update();

  ball.update();
  ball.edges();
  ball.show();

  // left.y = ball.y;
  // right.y = mouseY;

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(leftscore, width / 2 - 80, 40);
  text(rightscore, width / 2 + 80, 40);
  stroke(255);
  strokeCap(SQUARE);
  strokeWeight(6);
  let y1 = 0;
  let y2 = 20;
  for (let i = 0; i <= 400; i++) {
    line(width / 2, y1, width / 2, y2);
    y1 += 40;
    y2 += 40;
  }

  socket.on("move-left", data => {
    left.move(data);
  });

  socket.on("move-right", data => {
    right.move(data);
  });

  let side;
  socket.on("side", side => {
    side = side;
  });

  if (side == 0) {
    // Left paddle

    // User pressed "A"
    if (keyIsDown(65)) {
      socket.emit("move-left", -10);
      // left.move(-10);
    } else if (!keyIsDown(65) && !keyIsDown(90)) {
      socket.emit("move-left", 0);
      // left.move(0);
    }

    // User pressed "Z"
    if (keyIsDown(90)) {
      socket.emit("move-left", 10);
      // left.move(10);
    }
  } else if (side == 1) {
    // Right paddle

    // User pressed "K"
    if (keyIsDown(75)) {
      socket.emit("move-right", -10);
    } else if (!keyIsDown(75) && !keyIsDown(77)) {
      // right.move(0);
      socket.emit("move-right", 0);
    }

    // User pressed "M"
    if (keyIsDown(77)) {
      socket.emit("move-right", 10);
      // right.move(10);
    }
  }
}
