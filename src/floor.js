class Floor {
  constructor (game) {
    this.game = game;
  }

  draw () {
    push();
    fill(this.game.color7);
    noStroke();
    rect(0, this.game.y_floor, this.game.gameWidth, this.game.gameHeight - this.game.y_floor);
    pop(); 
  }

}