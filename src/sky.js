class Sky {
  constructor(game) {
    this.game = game;
    this.img_bg = [drawShape0]
    this.sky = new Hill(this.img_bg[0]);
  }

  draw() {
    this.sky.draw(this.game.color0);
  }

}