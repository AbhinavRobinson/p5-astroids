"use strict";
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
    ship.boosting(false);
}
function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    }
    else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    }
    else if (keyCode == UP_ARROW) {
        ship.boosting(true);
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
    update() {
        if (this.isBoosting)
            this.boost();
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    boost() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    boosting(boostState) {
        this.isBoosting = boostState;
    }
    render() {
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    }
    setRotation(amount) {
        this.rotation = amount;
    }
    turn() {
        this.heading += this.rotation;
    }
}
var ship;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
}
function draw() {
    background(0);
    ship.render();
    ship.turn();
    ship.update();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map