"use strict";
class Astroid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.r = random(5, 25);
        this.total = floor(random(5, 10));
        this.offset = [];
        this.magicNumber = random(9, 12);
        for (var i = 0; i < this.total; i++) {
            this.offset[i] = random(-this.magicNumber, this.magicNumber);
        }
    }
    render() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
        strokeWeight(1);
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
        }
        else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        else if (this.pos.y < -this.r) {
            this.pos.y = height - this.r;
        }
        else if (this.pos.y > height + this.r) {
            this.pos.y = this.r;
        }
    }
}
class ColorHelper {
    static getColorVector(c) {
        return createVector(red(c), green(c), blue(c));
    }
    static rainbowColorBase() {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    }
    static getColorsArray(total, baseColorArray = null) {
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(x => this.getColorVector(x));
        ;
        let colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    }
    static getColorByPercentage(firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    }
}
function keyReleased() {
    ship.setRotation(0);
    ship.setBoost(false);
}
function keyPressed() {
    if (key == " ") {
        laser.push(new Laser(ship.pos));
    }
    else if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    }
    else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    }
    else if (keyCode == UP_ARROW) {
        ship.setBoost(true);
    }
}
class Laser {
    constructor(shipPosition) {
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
class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.r = 20;
        this.heading = 0;
        this.rotation = 0;
        this.vel = createVector(0, 0);
        this.isBoosting = false;
    }
    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }
    update() {
        if (this.isBoosting)
            this.boost();
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    edgeWrapper() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        }
        else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        else if (this.pos.y < -this.r) {
            this.pos.y = height - this.r;
        }
        else if (this.pos.y > height + this.r) {
            this.pos.y = this.r;
        }
    }
    setRotation(amount) {
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
    setBoost(boostState) {
        this.isBoosting = boostState;
    }
}
var ship;
var astroids = [];
var laser = [];
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (var i = 0; i < 10; i++) {
        astroids.push(new Astroid());
    }
}
function draw() {
    background(0);
    ship.render();
    ship.update();
    ship.turn();
    ship.edgeWrapper();
    for (var i = 0; i < astroids.length; i++) {
        astroids[i].render();
        astroids[i].update();
        astroids[i].edgeWrapper();
    }
    for (var i = 0; i < laser.length; i++) {
        laser[i].render();
        laser[i].update();
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map