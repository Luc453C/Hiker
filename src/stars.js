class Stars {

  constructor(game) {
    this.game = game;
    this.starList = [];
    this.stagesAllowed = ["noche"];
  }
  draw() {
    for (let i = 0; i < this.starList.length; i++) {
      this.starList[i].draw();
      this.starList[i].changeSize();
    }
    this.create();
  }

  create() {
    if ((this.stagesAllowed.includes(this.game.director.getCurrentStage())) && (this.game.tripStars)) {
      if (this.starList.length === 0) {
        for (let i = 0; i < int(random(100, 300)); i++) {
          let aux = new StarsUnit(random(width), random(0, random(height / 2)));
          this.starList.push(aux);
        }
      }
    } else {
      this.kill();
    }

  }
  kill() {
    this.starList = [];
  }
}