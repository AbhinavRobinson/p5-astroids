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
function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.render = () => {
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    };
    this.turn = (angle) => {
        this.heading += angle;
    };
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
    ship.turn(0.01);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map