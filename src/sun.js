class Sun {

  constructor(game) {
    this.game = game;
  }

  draw() {
    this.diam = 80;
    this.x = this.game.sun_x;
    this.y = this.game.sun_y;
    this.op = 250;
    this.c = color(253, 255, 208, this.op)

    if (game.director.getCurrentStage() !== "noche") {
      push();
      noStroke();
      for (let i = 0; i < 20; i++) {
        fill(this.c);
        ellipse(this.x, this.y, this.diam, this.diam);
        this.op = this.op * 0.75;
        this.diam += 5 * i;
        this.c = color(253, 255, 208, this.op)
      }
      pop();
    } else {
      return
    }


  }
}