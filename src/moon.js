class Moon {
  constructor(game) {
    this.game = game;
    this.x;
    this.y;
    this.scl;
    this.color;
    this.op;
  }


  draw() {
    this.scl = 0.2;
    this.x = this.game.sun_x;
    this.y = this.game.sun_y;
    this.op = 200;
    this.color = color(224, 245, 255, this.op);

    if (this.game.director.getCurrentStage() === "noche") {
      push();
      noStroke();
      fill(this.color);
      drawMoon(this.x, this.y, this.scl)

      let diam = 60;
      this.op = this.op * 0.05;
      this.color = color(224, 245, 255, this.op)
      for (let i = 0; i < 10; i++) {
        fill(this.color);
        this.op = this.op * 0.8;
        this.color = color(224, 245, 255, this.op)
        ellipse(this.x, this.y, diam, diam);
        diam += 7 * i;
      }
      pop();
    }


  }
}