class Rain {

  constructor(game) {
    this.game = game;
    this.dropList = [];
    this.stagesAllowed = ['noche', 'lluvia_noche', 'tormenta']
  }

  draw() {
    for (let i = 0; i < this.dropList.length; i++) {
      this.dropList[i].update();
      this.dropList[i].draw();
    }

    for (let i = this.dropList.length - 1; i >= 0; i--) {
      if (this.dropList[i].kill)
        this.dropList.splice(i);
    }

    this.create();
  }

  create() {
    if (this.stagesAllowed.includes(this.game.director.getCurrentStage()) && (this.game.tripRain)) {
      if (frameCount % 20 == 0) {
        for (let i = 0; i < int(random(500, 1500)); i++) {
          let drop = new RainUnit();
          this.dropList.push(drop);
        }
      }
    } else {
      this.kill();
    }
  }

  kill() {
    this.dropList = [];
  }
}