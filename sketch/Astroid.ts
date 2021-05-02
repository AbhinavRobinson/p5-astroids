class Astroid {
  pos: p5.Vector;
  r: number;

  constructor() {
    this.pos = createVector(random(width), random(height));
    this.r = 50;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
