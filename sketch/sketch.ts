// global ship variable
var ship: Ship;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);

  // Init ship
  ship = new Ship();
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // CLEAR BACKGROUND
  background(0);

  ship.render();
  ship.turn(0.01);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
