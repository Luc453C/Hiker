class Hills {
  constructor(game) {
    this.game = game;
    this.img_bg = [drawShape1, drawShape2, drawShape3, drawShape4, drawShape5, drawShape6]
    this.vel = [0, 0.1, 0.5, 1, 1.2, 1.5]
    this.color = []
    this.bgList = [];
    for (let i = 0; i < this.img_bg.length; i++) {
      this.bgList[i] = new Hill(this.img_bg[i]);
    }
  }

  draw() {
    this.color = [
      this.game.color1,
      this.game.color2,
      this.game.color3,
      this.game.color4,
      this.game.color5,
      this.game.color6
    ]

    if (this.bgList.length > 0) {
      for (let i = 0; i < this.bgList.length; i++) {
        this.bgList[i].draw(this.color[i]);
      }
    }

    this.move();
  }

  move() {
    if (this.bgList.length > 0) {
      for (let i = 0; i < this.bgList.length; i++) {
        this.bgList[i].move(this.vel[i]);
      }
    }
  }
}