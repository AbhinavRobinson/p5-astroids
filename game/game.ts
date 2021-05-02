var ship: Ship;
var astroids: Astroid[] = [];
var laser: Laser[] = [];
var score: number = 0;
var gameIsOverAndHalt: number = 0;

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight);

  ship = new Ship();

  for (var i = 0; i < int(width / 50); i++) {
    astroids.push(new Astroid());
  }
}

function draw() {
  background(0);

  for (var i = astroids.length - 1; i >= 0; i--) {
    if (ship.hits(astroids[i])) {
      score -= 150;
      astroids.splice(i, 1);
      var rand_A = random(0, 10);
      var rand_B = random(0, 10);
      var newAPos = createVector(
        rand_A > 5 ? 0 : width,
        rand_B > 5 ? 0 : height
      );
      astroids.push(new Astroid(newAPos));
      continue;
    }
    astroids[i].render();
    astroids[i].update();
    astroids[i].edgeWrapper();
  }

  for (var i = laser.length - 1; i >= 0; i--) {
    laser[i].render();
    laser[i].update();

    if (laser[i].offscreen()) {
      laser.splice(i, 1);
      break;
    }

    for (var j = astroids.length - 1; j >= 0; j--) {
      if (laser[i].hits(astroids[j])) {
        score += 100;
        if (astroids[j].r > 10) {
          var newAstroids: Astroid[] = astroids[j].breakup();
          astroids.push(...newAstroids);
        }
        astroids.splice(j, 1);
        laser.splice(i, 1);
        break;
      }
    }
  }

  ship.render();
  ship.update();
  ship.turn();
  ship.edgeWrapper();

  fill(200);
  textSize(32);
  text("Score : " + score, width / 2 - 75, 100);
}

function reset() {
  astroids = [];
  laser = [];
  ship.pos.x = width / 2;
  ship.pos.y = height / 2;
  score = 0;
  ship.vel.x = 0;
  ship.vel.y = 0;
  for (var i = 0; i < int(width / 50); i++) {
    astroids.push(new Astroid());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}
