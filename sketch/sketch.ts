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

// for TS sake
declare class Ship {
  render: () => void;
  turn: (angle: number) => void;
  constructor();
}

function Ship() {
  // define postion
  this.pos = createVector(width / 2, height / 2);
  // size of ship
  this.r = 20;
  // add rotation variable (radians)
  this.heading = 0;

  // render ship
  this.render = () => {
    // set position
    translate(this.pos.x, this.pos.y);
    // add rotation
    rotate(this.heading);
    // create triangle
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  };

  this.turn = (angle: number) => {
    this.heading += angle;
  };
}
