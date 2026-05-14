let scene = 1;

// 1 = Joy
// 2 = Message after first tree cut
// 3 = Rain Melancholy
// 4 = Message after all trees cut
// 5 = Storm Anger
// 6 = Message before snow
// 7 = Snow Calmness

let flowers = [];
let raindrops = [];
let snowflakes = [];

let trees = [];
let cloudX = 0;

function setup() {
  createCanvas(900, 600);

  // Flowers
  for (let i = 0; i < 90; i++) {
    flowers.push({
      x: random(20, width - 20),
      y: random(430, 580),
      a: random(TWO_PI)
    });
  }

  // Rain
  for (let i = 0; i < 300; i++) {
    raindrops.push({
      x: random(width),
      y: random(height),
      speed: random(6, 12)
    });
  }

  // Snow
  for (let i = 0; i < 250; i++) {
    snowflakes.push({
      x: random(width),
      y: random(height),
      speed: random(1, 2),
      size: random(5, 12)
    });
  }

  // Trees
  trees = [
    { x: 120, y: 450, cut: false },
    { x: 320, y: 450, cut: false },
    { x: 530, y: 450, cut: false },
    { x: 750, y: 450, cut: false }
  ];
}

function draw() {
  cloudX += 0.3;

  if (scene == 1) {
    drawSkyGradient(color(80, 170, 255), color(255, 200, 150));
    drawClouds();
    drawSun();
    drawBirds();
    drawMountains(false);
    drawGround(false);
    drawFlowers(false);
    drawTrees();
    drawMan(70, 460);
    drawNatureFace("happy");
    drawTitle("Sunshine as Joy", color(255, 255, 0));
  }

  if (scene == 2) {
    background(15);
    drawTitle("After cutting a tree, nature becomes melancholic(Sad)", color(255));
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Click to continue", width / 2, height / 2 + 40);
  }

  if (scene == 3) {
    drawSkyGradient(color(70, 90, 120), color(110, 120, 140));
    drawClouds();
    drawMountains(true);
    drawGround(true);
    drawFlowers(true);
    drawTrees();
    drawMan(70, 460);
    drawNatureFace("sad");
    drawTitle("Rain as Melancholy", color(80, 220, 255));
    drawRain(5);
  }

  if (scene == 4) {
    background(15);
    drawTitle("When humans destroy forests, nature becomes angry", color(255, 120, 120));
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Click to continue", width / 2, height / 2 + 40);
  }

  if (scene == 5) {
    drawSkyGradient(color(40, 40, 60), color(90, 50, 50));
    drawClouds();
    drawMoon();
    drawMountains(true);
    drawGround(true);
    drawFlowers(true);
    drawTrees();
    drawNatureFace("angry");
    drawTitle("Storm as Anger", color(255, 180, 0));
    drawMan(70, 460);
    drawMan(270, 460);
    drawMan(480, 460);
    drawMan(700, 460);
    drawRain(14);
    if (random(1) < 0.05) {
      drawLightning();
    }
  }

  if (scene == 6) {
    background(230);
    drawTitle("A child plants a tree, and nature becomes calm again", color(0, 120, 0));
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Click to continue", width / 2, height / 2 + 40);
  }

  if (scene == 7) {
    drawSkyGradient(color(210, 235, 255), color(255, 255, 255));
    drawBirds();
    drawMountains(false);
    drawGroundSnow();
    drawFlowers(false);
    drawNatureFace("calm");
    drawTitle("Snow as Calmness", color(0, 120, 180));

    // Bigger man and plant
    drawManWithPlant(380, 470);
    drawPlant(500, 535, 1.4);
    drawSnowman();

    drawSnow();

    fill(50);
    textAlign(CENTER, CENTER);
    textSize(19);
    text(
      "As weather and seasons change, human moods also change. \nThrough our bad actions, humans can change nature's mood too.",
      width / 2,
      height - 48
    );
  }
}

// =========================================
// SKY
// =========================================

function drawSkyGradient(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

// =========================================
// CLOUDS
// =========================================

function drawClouds() {
  drawCloud(cloudX + 100, 100);
  drawCloud(cloudX + 350, 80);
  drawCloud(cloudX + 650, 120);

  if (cloudX > width) {
    cloudX = -700;
  }
}

function drawCloud(x, y) {
  fill(255, 230);
  noStroke();
  ellipse(x, y, 60);
  ellipse(x + 25, y - 10, 60);
  ellipse(x + 50, y, 60);
}

// =========================================
// TITLE
// =========================================

function drawTitle(t, c) {
  fill(c);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(29);
  text(t, width / 2, 0);
}

// =========================================
// SUN / MOON
// =========================================

function drawSun() {
  fill(255, 220, 100, 50);
  ellipse(700, 120, 180);

  fill(255, 220, 100, 90);
  ellipse(700, 120, 130);

  fill(255, 230, 0);
  ellipse(700, 120, 80);
}

function drawMoon() {
  fill(240);
  ellipse(700, 120, 80);

  fill(40, 40, 60);
  ellipse(720, 115, 75);
}

// =========================================
// NATURE FACE
// =========================================

function drawNatureFace(mood) {
  let faceX = width / 2;
  let faceY = 105;

  // Eyes
  fill(255);
  stroke(0);
  strokeWeight(3);

  ellipse(faceX - 50, faceY - 10, 70, 70);
  ellipse(faceX + 50, faceY - 10, 70, 70);

  fill(0);
  ellipse(faceX - 50, faceY - 10, 35, 35);
  ellipse(faceX + 50, faceY - 10, 35, 35);

  fill(255);
  ellipse(faceX - 40, faceY - 20, 10, 10);
  ellipse(faceX + 60, faceY - 20, 10, 10);

  noFill();
  stroke(0);
  strokeWeight(5);

  if (mood == "happy") {
    arc(faceX, faceY + 50, 100, 50, 0, PI);
  }

  if (mood == "sad") {
    arc(faceX, faceY + 70, 80, 40, PI, TWO_PI);
    noStroke();
    fill(100, 180, 255);
    ellipse(faceX - 50, faceY + 25, 10, 30);
    ellipse(faceX + 50, faceY + 25, 10, 30);
  }

  if (mood == "angry") {
    stroke(70);
    strokeWeight(8);
    line(faceX - 80, faceY - 55, faceX - 20, faceY - 35);
    line(faceX + 80, faceY - 55, faceX + 20, faceY - 35);
    stroke(0);
    strokeWeight(5);
    line(faceX - 40, faceY + 60, faceX + 40, faceY + 60);
  }

  if (mood == "calm") {
    arc(faceX, faceY + 45, 80, 30, 0, PI);
  }

  noStroke();
}

// =========================================
// MOUNTAINS
// =========================================

function drawMountains(dull) {
  noStroke();

  if (!dull) {
    fill(90, 90, 120);
    triangle(0, 400, 180, 180, 350, 400);

    fill(120, 100, 120);
    triangle(200, 400, 450, 170, 700, 400);

    fill(80, 110, 130);
    triangle(500, 400, 760, 200, 1000, 400);
  } else {
    fill(70, 70, 90);
    triangle(0, 400, 180, 180, 350, 400);

    fill(95, 85, 95);
    triangle(200, 400, 450, 170, 700, 400);

    fill(60, 80, 95);
    triangle(500, 400, 760, 200, 1000, 400);
  }
}

// =========================================
// GROUND
// =========================================

function drawGround(dull) {
  let g1;
  let g2;

  if (!dull) {
    g1 = color(70, 200, 70);
    g2 = color(20, 120, 20);
  } else {
    g1 = color(50, 100, 50);
    g2 = color(20, 60, 20);
  }

  for (let y = 400; y < height; y++) {
    let inter = map(y, 400, height, 0, 1);
    let c = lerpColor(g1, g2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGroundSnow() {
  for (let y = 400; y < height; y++) {
    let inter = map(y, 400, height, 0, 1);
    let c = lerpColor(color(235, 245, 255), color(190, 210, 230), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// =========================================
// FLOWERS
// =========================================

function drawFlowers(dull) {
  for (let f of flowers) {
    push();
    translate(f.x, f.y);
    rotate(f.a);

    stroke(0, 150, 0);
    line(0, 0, 0, 18);

    noStroke();
    if (dull) {
      fill(220, 220, 220, 140);
    } else {
      fill(255, 100, 150);
    }

    ellipse(-4, 0, 8);
    ellipse(4, 0, 8);
    ellipse(0, -4, 8);
    ellipse(0, 4, 8);

    fill(255, 220, 0);
    ellipse(0, 0, 6);

    pop();
  }
}

// =========================================
// TREES
// =========================================

function drawTrees() {
  for (let t of trees) {
    push();
    translate(t.x, t.y);

    if (!t.cut) {
      fill(100, 60, 20);
      rect(-15, -100, 30, 100);

      fill(30, 140, 40);
      ellipse(0, -120, 100);
      ellipse(-35, -100, 80);
      ellipse(35, -100, 80);
    } else {
      fill(90, 55, 20);
      rect(-15, -25, 30, 25);
      fill(120, 80, 30);
      ellipse(0, -25, 35, 12);
    }

    pop();
  }
}

// =========================================
// MAN
// =========================================

function drawMan(x, y) {
  fill(230, 200, 170);
  ellipse(x, y - 55, 28, 32);

  fill(40);
  rect(x - 10, y - 40, 20, 45, 5);

  stroke(0);
  strokeWeight(3);
  line(x - 5, y + 5, x - 10, y + 25);
  line(x + 5, y + 5, x + 10, y + 25);

  stroke(90, 50, 20);
  strokeWeight(5);
  line(x + 10, y - 20, x + 40, y - 55);

  noStroke();
  fill(170);
  rect(x + 36, y - 67, 18, 12);

  fill(130);
  triangle(
    x + 54, y - 61,
    x + 68, y - 55,
    x + 54, y - 49
  );
}

// bigger man in snow scene
function drawManWithPlant(x, y) {
  push();
  translate(x, y);
  scale(1.2);

  fill(230, 200, 170);
  ellipse(0, -55, 32, 36);

  fill(40);
  rect(-12, -40, 24, 52, 5);

  stroke(0);
  strokeWeight(3);
  line(-6, 5, -12, 28);
  line(6, 5, 12, 28);

  // arms as if planting
  line(-10, -18, -35, -5);
  line(10, -18, 35, -5);

  noStroke();
  fill(90);
  rect(-2, 10, 4, 35);

  pop();
}

// =========================================
// PLANT
// =========================================

function drawPlant(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  stroke(120, 70, 20);
  strokeWeight(4);
  line(0, 0, 0, -35);

  noStroke();
  fill(40, 170, 60);
  ellipse(-12, -40, 18, 28);
  ellipse(12, -40, 18, 28);
  ellipse(-24, -25, 16, 24);
  ellipse(24, -25, 16, 24);
  ellipse(0, -18, 18, 28);

  pop();
}

// =========================================
// SNOWMAN
// =========================================

function drawSnowman() {
  fill(255);
  noStroke();

  ellipse(760, 530, 90);
  ellipse(760, 470, 65);
  ellipse(760, 410, 45);

  fill(0);
  ellipse(752, 405, 5);
  ellipse(768, 405, 5);

  fill(255, 140, 0);
  triangle(
    760, 412,
    760, 418,
    776, 415
  );
}

// =========================================
// BIRDS
// =========================================

function drawBirds() {
  stroke(0);
  noFill();

  let positions = [
    [120, 130],
    [300, 180],
    [500, 140],
    [700, 200],
    [400, 100],
    [800, 160]
  ];

  for (let p of positions) {
    let x = p[0] + sin(frameCount * 0.01 + p[1]) * 20;
    let y = p[1];

    arc(x, y, 20, 10, PI, TWO_PI);
    arc(x + 20, y, 20, 10, PI, TWO_PI);
  }
}

// =========================================
// RAIN
// =========================================

function drawRain(speedBoost) {
  stroke(170, 200, 255, 170);
  strokeWeight(2);

  for (let r of raindrops) {
    line(r.x, r.y, r.x, r.y + 25);
    r.y += r.speed + speedBoost;

    if (r.y > height) {
      r.y = -20;
      r.x = random(width);
    }
  }

  noStroke();
}

// =========================================
// SNOW
// =========================================

function drawSnow() {
  noStroke();
  fill(255);

  for (let s of snowflakes) {
    ellipse(s.x, s.y, s.size + 5);
    s.y += s.speed * 0.4;
    s.x += sin(frameCount * 0.01 + s.y) * 0.5;

    if (s.y > height) {
      s.y = -10;
      s.x = random(width);
    }
  }
}

// =========================================
// LIGHTNING
// =========================================

function drawLightning() {
  stroke(255, 255, 180);
  strokeWeight(5);

  let lx = random(300, 650);
  line(lx, 0, lx - 25, 100);
  line(lx - 25, 100, lx + 15, 180);
  line(lx + 15, 180, lx - 35, 280);

  noStroke();
}

// =========================================
// CLICK
// =========================================

function mousePressed() {
  if (scene == 1) {
    trees[0].cut = true;
    scene = 2;
    return;
  }

  if (scene == 2) {
    scene = 3;
    return;
  }

  if (scene == 3) {
    for (let t of trees) {
      t.cut = true;
    }
    scene = 4;
    return;
  }

  if (scene == 4) {
    scene = 5;
    return;
  }

  if (scene == 5) {
    scene = 6;
    return;
  }

  if (scene == 6) {
    scene = 7;
    return;
  }
}