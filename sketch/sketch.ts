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

  ship.render();
  ship.update();
  ship.turn();
  ship.edgeWrapper();

  for (var i = 0; i < astroids.length; i++) {
    astroids[i].render();
    astroids[i].update();
    astroids[i].edgeWrapper();
  }

  for (var i = 0; i < laser.length; i++) {
    laser[i].render();
    laser[i].update();
  }
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
