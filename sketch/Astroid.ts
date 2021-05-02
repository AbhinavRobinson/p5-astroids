class Astroid {
  pos: p5.Vector;
  vel: p5.Vector;
  r: number;
  total: number;
  offset: number[];
  magicNumber: number;

  constructor(pos?: p5.Vector, maxSize?: number) {
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.r = maxSize ? random(5, maxSize) : random(5, 25);
    this.total = floor(random(5, 10));
    this.offset = [];
    this.magicNumber = this.r;

    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.magicNumber, this.magicNumber);
    }
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < 10; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = this.r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  update() {
    this.pos.add(this.vel);
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

  breakup() {
    console.log(this, "BP");
    var newA: Astroid[] = [];
    newA.push(new Astroid(this.pos, this.r));
    newA.push(new Astroid(this.pos, this.r));
    return newA;
  }
}
