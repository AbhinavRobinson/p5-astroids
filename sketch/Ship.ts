// Type declarations
declare class Ship {
  render: () => void; // render ship
  turn: () => void; // activate turn handler
  setRotation: (amount: number) => void; // set turn amount
  constructor();
}

// Create Ship
function Ship() {
  // define postion
  this.pos = createVector(width / 2, height / 2);
  // size of ship
  this.r = 20;
  // default heading
  this.heading = 0;
  // add rotation variable (radians)
  this.rotation = 0;

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

  // set rotation (on key stroke)
  this.setRotation = (amount: number) => {
    this.rotation = amount;
  };

  // update heading
  this.turn = () => {
    this.heading += this.rotation;
  };
}
