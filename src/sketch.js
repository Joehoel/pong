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
    text(leftscore, 32 + width / 3, 40);
    text(rightscore, width - 48 - width / 3, 40);
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
}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    console.log(key);
    if (key === "A") {
        left.move(-10);
    } else if (key == "Z") {
        left.move(10);
    }

    if (key === "K") {
        right.move(-10);
    } else if (key === "M") {
        right.move(10);
    }
}
