// global ship variable
var ship: Ship;
var astroids: Astroid[] = [];

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
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
