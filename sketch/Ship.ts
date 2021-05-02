"use strict";
class Ship {
  pos: p5.Vector;
  r: number;
  heading: number;
  rotation: number;
  vel: p5.Vector;

  constructor() {
    // define postion
    this.pos = createVector(width / 2, height / 2);
    // size of ship
    this.r = 20;
    // default heading
    this.heading = 0;
    // add rotation variable (radians)
    this.rotation = 0;

    this.vel = createVector(0, 0);
  }

  update() {
    this.pos.add(this.vel);
  }

  boost() {
    var force = p5.Vector.fromAngle(this.heading);
    this.vel.add(force);
  }

  render() {
    // set position
    translate(this.pos.x, this.pos.y);
    // add rotation
    rotate(this.heading + PI / 2);
    // create triangle
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }

  setRotation(amount: number) {
    this.rotation = amount;
  }
  turn() {
    this.heading += this.rotation;
  }
}
