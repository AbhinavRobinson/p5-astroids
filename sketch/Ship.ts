"use strict";
class Ship {
  pos: p5.Vector;
  r: number;
  heading: number;
  rotation: number;
  vel: p5.Vector;
  isBoosting: boolean;

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

    this.isBoosting = false;
  }

  update() {
    if (this.isBoosting) this.boost();
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  boost() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  boosting(boostState: boolean) {
    this.isBoosting = boostState;
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

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height - this.r;
    } else if (this.pos.y > height + this.r) {
      this.pos.y = this.r;
    }
  }

  setRotation(amount: number) {
    this.rotation = amount;
  }
  turn() {
    this.heading += this.rotation;
  }
}
