function keyReleased() {
  ship.setRotation(0);
  ship.setBoost(false);
}

function keyPressed() {
  if (key == " ") {
    laser.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.setBoost(true);
  } else if (keyCode == ESCAPE) {
    reset();
    gameIsOverAndHalt = 60;
  }
}
