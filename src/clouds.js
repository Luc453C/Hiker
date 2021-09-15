class Clouds {

  constructor(game) {
    this.game = game;
    this.cloudList = [];
    this.cloudColor;
    this.cloudsAllowed = ["dia", "atardecer", "otoño", "bosque", "noche"]
  }

  draw() {

    this.cloudColor = this.game.cloudColor;

    for (let i = 0; i < this.cloudList.length; i++) {
      this.cloudList[i].move();
      this.cloudList[i].draw(this.cloudColor);
    }

    for (let i = this.cloudList.length - 1; i >= 0; i--) {
      if (this.cloudList[i].kill == true)
        this.cloudList.splice(i);
    }

    this.create();
  }

  create() {

    if (this.cloudsAllowed.includes(this.game.director.getCurrentStage()) && (this.game.tripClouds === true)) {

      if (frameCount % 200 == 0) {
        for (let i = 0; i < int(random(1, 2)); i++) {
          let aux = new CloudsUnit();
          this.cloudList.push(aux);
        }
      }
    } else {
      this.kill();
    }
  }


  kill() {
    this.cloudList = [];
  }
}