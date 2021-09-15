class Flys {

  constructor(game) {
    this.game = game;
    this.flyTarget_x;
    this.flyTarget_y;
    this.flysList = [];
  }

  draw() {
    this.flyTarget_x = this.game.flyTarget_x;
    this.flyTarget_y = this.game.flyTarget_y;
    for (let i = 0; i < this.flysList.length; i++) {
      this.flysList[i].update(this.flyTarget_x, this.flyTarget_y);
      this.flysList[i].draw();
    }
    for (let i = this.flysList.length - 1; i >= 0; i--) {
      if (this.flysList[i].kill)
        this.flysList.splice(i);
    }
  }
  create() {
    if (this.game.tripFlys) {
      for (let i = 0; i < int(random(15, 30)); i++) {
        let aux = new FlysUnit();
        this.flysList.push(aux);
      }
    }
  }
}