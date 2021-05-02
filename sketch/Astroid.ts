class Astroid {
  pos: p5.Vector;
  r: number;
  total: number;

  constructor() {
    this.pos = createVector(random(width), random(height));
    this.r = random(10, 35);
    this.total = floor(random(5, 10));
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < 10; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var x = this.r * cos(angle);
      var y = this.r * sin(angle);
      vertex(x, y);
    }
    endShape();
    pop();
  }
}
