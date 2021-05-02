function keyReleased() {
  ship.setRotation(0);
  ship.setBoost(false);
}

function keyPressed() {
  if (key == " ") {
    laser.push(new Laser(ship.pos));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.setBoost(true);
  }
}
