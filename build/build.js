"use strict";
class Astroid {
    constructor(pos, maxSize) {
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
    breakup() {
        console.log(this, "BP");
        var newA = [];
        newA.push(new Astroid(this.pos, this.r));
        newA.push(new Astroid(this.pos, this.r));
        return newA;
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
        laser.push(new Laser(ship.pos, ship.heading));
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
    constructor(shipPosition, angle) {
        this.laserSpeed = 7.5;
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
    hits(astroidId) {
        var d = dist(this.pos.x, this.pos.y, astroidId.pos.x, astroidId.pos.y);
        if (d <= astroidId.r * 1.75) {
            return true;
        }
        return false;
    }
    offscreen() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        }
        else if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }
        return false;
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
        fill(0);
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
    hits(astroidId) {
        var d = dist(this.pos.x, this.pos.y, astroidId.pos.x, astroidId.pos.y);
        if (d < this.r + astroidId.r) {
            return true;
        }
        return false;
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
    for (var i = astroids.length - 1; i >= 0; i--) {
        if (ship.hits(astroids[i])) {
            console.log("You Hit bro");
            astroids.splice(i, 1);
            var rand_A = random(0, 10);
            var rand_B = random(0, 10);
            var newAPos = createVector(rand_A > 5 ? 0 : width, rand_B > 5 ? 0 : height);
            astroids.push(new Astroid(newAPos));
            continue;
        }
        astroids[i].render();
        astroids[i].update();
        astroids[i].edgeWrapper();
    }
    for (var i = laser.length - 1; i >= 0; i--) {
        laser[i].render();
        laser[i].update();
        for (var j = astroids.length - 1; j >= 0; j--) {
            if (laser[i].hits(astroids[j])) {
                if (astroids[j].r > 10) {
                    var newAstroids = astroids[j].breakup();
                    astroids.push(...newAstroids);
                }
                astroids.splice(j, 1);
                laser.splice(i, 1);
                break;
            }
        }
        if (laser[i].offscreen()) {
            laser.splice(i, 1);
        }
    }
    ship.render();
    ship.update();
    ship.turn();
    ship.edgeWrapper();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map