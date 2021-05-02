// Type declarations
declare class Ship {
  render: () => void;
  turn: (angle: number) => void;
  constructor();
}

// Create Ship
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
