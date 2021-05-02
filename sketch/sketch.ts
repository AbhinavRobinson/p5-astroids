// global ship variable
var ship: Ship;
var astroids: Astroid[] = [];
var laser: Laser[] = [];

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);

  // Init ship
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    astroids.push(new Astroid());
  }
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // CLEAR BACKGROUND
  background(0);

  for (var i = 0; i < astroids.length; i++) {
    astroids[i].render();
    astroids[i].update();
    astroids[i].edgeWrapper();
  }

  for (var i = laser.length - 1; i >= 0; i--) {
    laser[i].render();
    laser[i].update();

    for (var j = astroids.length - 1; j >= 0; j--) {
      if (laser[i].hits(astroids[j])) {
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
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
