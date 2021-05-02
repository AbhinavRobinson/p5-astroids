class Laser {
  pos: p5.Vector;
  vel: p5.Vector;
  laserSpeed: number = 7.5;

  constructor(shipPosition: p5.Vector, angle: number) {
    this.pos = createVector(shipPosition.x, shipPosition.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(this.laserSpeed);
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    strokeWeight(1);
    pop();
  }

  hits(astroidId: Astroid) {
    var d = dist(this.pos.x, this.pos.y, astroidId.pos.x, astroidId.pos.y);
    // graceful bound box
    if (d <= astroidId.r * 1.75) {
      return true;
    }
    return false;
  }
}
