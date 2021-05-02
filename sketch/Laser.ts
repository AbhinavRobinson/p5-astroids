class Laser {
  pos: p5.Vector;
  vel: p5.Vector;

  constructor(shipPosition: p5.Vector) {
    this.pos = createVector(shipPosition.x, shipPosition.y);
    this.vel = createVector();
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
