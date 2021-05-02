"use strict";

class Ship {
  pos: p5.Vector;
  r: number;
  heading: number;
  rotation: number;
  vel: p5.Vector;
  isBoosting: boolean;
  isHit: boolean;
  delay: number = 15;

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

  render() {
    push();
    // set position
    translate(this.pos.x, this.pos.y);
    // add rotation
    rotate(this.heading + PI / 2);
    // create triangle
    strokeWeight(this.isHit ? 7 : 1);
    fill(this.isHit ? 150 : 0, 0, 0);
    stroke(255, this.isHit ? 0 : 255, this.isHit ? 0 : 255);
    if (this.delay > 0) {
      this.delay--;
    } else {
      this.delay = 15;
      this.isHit = false;
    }
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  }

  update() {
    if (this.isBoosting) this.boost();
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  edgeWrapper() {
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

  boost() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  setBoost(boostState: boolean) {
    this.isBoosting = boostState;
  }

  hits(astroidId: Astroid) {
    var d = dist(this.pos.x, this.pos.y, astroidId.pos.x, astroidId.pos.y);
    if (d < this.r + astroidId.r) {
      this.isHit = true;
      return true;
    }
    return false;
  }
}
